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
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;
import reactor.core.publisher.Mono;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;
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

  public Mono<String> saveImage(MultipartFile multipartFile) {
    String name = multipartFile.getOriginalFilename();
    try {
      return Mono.from(gridFSBucket.uploadFromStream(name,
          AsyncStreamHelper.toAsyncInputStream(multipartFile.getInputStream())))
          .map(ObjectId::toHexString);
    } catch (IOException e) {
      LOGGER.warn("Error saving image", e);
      return Mono.error(new Throwable("Unable to save image!"));
    }
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
            responseWriter.close();
          } catch (IOException e) {
            e.printStackTrace();
          }
        });
  }

  private Disposable getSubscribe(GridFSDownloadStream gridFSDownloadStream, FluxSink<ByteBuffer> synchronousSink) {
    ByteBuffer allocate = ByteBuffer.allocate(4096);
    return Mono.from(gridFSDownloadStream.read(allocate))
        .subscribe(read -> {
          LOGGER.info("" + read);
          if (read < 0) {
            synchronousSink.complete();
            gridFSDownloadStream.close();
          } else {
            synchronousSink.next(allocate);
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
