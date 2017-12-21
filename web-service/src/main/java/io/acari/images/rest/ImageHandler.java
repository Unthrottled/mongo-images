package io.acari.images.rest;

import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.reactivestreams.client.gridfs.GridFSBucket;
import com.mongodb.reactivestreams.client.gridfs.GridFSDownloadStream;
import io.acari.images.flux.FluxAsyncStreamConverter;
import io.acari.images.model.Identifier;
import org.bson.BsonObjectId;
import org.bson.BsonValue;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;
import reactor.core.publisher.Mono;

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

    public Flux<byte[]> fetchImage(String imageId) {
        GridFSDownloadStream gridFSDownloadStream = gridFSBucket.openDownloadStream(new ObjectId(imageId));
        return Flux.create(synchronousSink -> readStream(gridFSDownloadStream, synchronousSink));

    }

    private void readStream(GridFSDownloadStream gridFSDownloadStream, FluxSink<byte[]> synchronousSink) {
        ByteBuffer allocate = ByteBuffer.allocate(4096);
        Mono.from(gridFSDownloadStream.read(allocate))
                .subscribe(read -> {
                    if (read < 0) {
                        Mono.from(gridFSDownloadStream.close()).subscribe(a -> {
                                }, throwable -> {
                                }, synchronousSink::complete);
                    } else {
                        synchronousSink.next(allocate.array());
                        readStream(gridFSDownloadStream, synchronousSink);
                    }
                }, throwable -> {
                    LOGGER.warn("Ohhh snap!", throwable);
                    synchronousSink.complete();
                }, () -> {});
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
