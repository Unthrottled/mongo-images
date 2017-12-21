package io.acari.images.handler;

import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.reactivestreams.client.gridfs.GridFSBucket;
import com.mongodb.reactivestreams.client.gridfs.GridFSDownloadStream;
import io.acari.images.flux.DownloadStreamToFluxFactory;
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
import reactor.core.publisher.Mono;

import java.util.Objects;

@Component
public class ImageHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(ImageHandler.class);
  private final GridFSBucket gridFSBucket;
  private final DownloadStreamToFluxFactory downloadStreamToFluxFactory = new DownloadStreamToFluxFactory();

  @Autowired
  public ImageHandler(GridFSBucket gridFSBucket) {
    this.gridFSBucket = gridFSBucket;
  }

  public Flux<String> saveImage(Flux<Part> multipartFile) {
    return multipartFile
        .flatMap(part -> Mono.from(gridFSBucket.uploadFromStream(part.name(),
            FluxAsyncStreamConverter.convert(part.content()))))
        .map(ObjectId::toHexString);
  }

  public Flux<byte[]> fetchImage(String imageId) {
    return downloadStreamToFluxFactory
        .convert(gridFSBucket.openDownloadStream(getId(imageId)));
  }

  public Mono<Boolean> removeImage(String imageId) {
    return Mono.from(gridFSBucket.delete(getId(imageId)))
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

  private ObjectId getId(String imageId) {
    return new ObjectId(imageId);
  }
}
