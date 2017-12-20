package io.acari.images;

import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.reactivestreams.client.gridfs.GridFSBucket;
import com.mongodb.reactivestreams.client.gridfs.GridFSDownloadStream;
import com.mongodb.reactivestreams.client.gridfs.helpers.AsyncStreamHelper;
import org.bson.BsonObjectId;
import org.bson.BsonValue;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Component;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;
import reactor.core.publisher.Mono;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.ByteBuffer;
import java.util.Objects;

@Component
public class ImageHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(ImageHandler.class);
    private final GridFSBucket gridFSBucket;

    @Autowired
    public ImageHandler(GridFSBucket gridFSBucket) {
        this.gridFSBucket = gridFSBucket;
    }

    public Flux<String> saveImage(Flux<Part> multipartFile) {
      return multipartFile
          .flatMap(part -> Flux.from(gridFSBucket.uploadFromStream(part.name(), FluxAsyncStreamConverter.convert(part.content())))
                  .map(ObjectId::toHexString));
    }



    public Mono<byte[]> fetchImageBinary(String imageId) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        return Mono.from(gridFSBucket.downloadToStream(new ObjectId(imageId),
                AsyncStreamHelper.toAsyncOutputStream(outputStream)))
                .map(l -> outputStream.toByteArray());
    }

    public void fetchImage(String imageId, OutputStream responseWriter) {
        GridFSDownloadStream gridFSDownloadStream = gridFSBucket.openDownloadStream(new ObjectId(imageId));

        Flux.<ByteBuffer>create(
                synchronousSink -> getSubscribe(gridFSDownloadStream, synchronousSink))
                .subscribe(dataB -> {
                    try {
                        responseWriter.write(dataB.array());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }, error -> {
                }, () -> {
                    try {
                        LOGGER.info("closed");
                        responseWriter.flush();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
    }

    private Disposable getSubscribe(GridFSDownloadStream gridFSDownloadStream, FluxSink<ByteBuffer> synchronousSink) {
        ByteBuffer allocate = ByteBuffer.allocate(4096);
        return Mono.from(gridFSDownloadStream.read(allocate))
                .subscribe(read -> {
                    if (read < 0) {
                        Mono.from(gridFSDownloadStream.close())
                                .subscribe(a -> {
                                }, throwable -> {
                                }, () -> {
                                    LOGGER.info("read is " + read);
                                    synchronousSink.complete();
                                });
                    } else {
                        synchronousSink.next(allocate);
                        synchronousSink.complete();
                        getSubscribe(gridFSDownloadStream, synchronousSink);
                    }
                }, throwable -> {
                    LOGGER.warn("Ohhhshit", throwable);
                    synchronousSink.complete();
                }, () -> {
                });
    }


    public Mono<Boolean> removeImage(String imageId) {
        return Mono.from(gridFSBucket.delete(new ObjectId(imageId)))
                .map(Objects::nonNull)
                .onErrorReturn(false);
    }

    public Flux<Identifier> findAllNames() {
        return Flux.from(gridFSBucket.find())
                .map(GridFSFile::getId)
                .map(BsonValue::asObjectId)
                .map(BsonObjectId::getValue)
                .map(ObjectId::toHexString)
                .map(Identifier::new);

    }
}
