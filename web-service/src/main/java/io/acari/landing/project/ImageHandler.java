package io.acari.landing.project;

import com.mongodb.reactivestreams.client.gridfs.GridFSBucket;
import com.mongodb.reactivestreams.client.gridfs.GridFSDownloadStream;
import com.mongodb.reactivestreams.client.gridfs.helpers.AsyncStreamHelper;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
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
      return Mono.error(e);
    }
  }

  public Flux<DataBuffer> fetchImage(String imageId) {
    GridFSDownloadStream gridFSDownloadStream = gridFSBucket.openDownloadStream(new ObjectId(imageId));
    return Flux.generate(synchronousSink -> {
      DefaultDataBufferFactory defaultDataBufferFactory = new DefaultDataBufferFactory();
      ByteBuffer byteBuffer = ByteBuffer.allocate(4096);
      Mono.from(gridFSDownloadStream.read(byteBuffer))
          .subscribe(read -> {
            if (read < 0) {
              synchronousSink.complete();
              gridFSDownloadStream.close();
            } else {
              synchronousSink.next(defaultDataBufferFactory.wrap(byteBuffer));
            }
          }, throwable -> {
            LOGGER.warn("Ohhhshit", throwable);
            synchronousSink.complete();
          }, () -> {
            LOGGER.info("hmm");
          });
    });
  }

  public Mono<byte[]> fetchImageBinary(String imageId) {
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    return Mono.from(gridFSBucket.downloadToStream(new ObjectId(imageId),
        AsyncStreamHelper.toAsyncOutputStream(outputStream)))
        .map(l -> outputStream.toByteArray());
  }

  public Mono<Boolean> removeImage(String imageId) {
    return Mono.from(gridFSBucket.delete(new ObjectId(imageId)))
        .map(Objects::nonNull);
  }
}
