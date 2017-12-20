package io.acari.images;

import com.mongodb.reactivestreams.client.Success;
import com.mongodb.reactivestreams.client.gridfs.AsyncInputStream;
import org.reactivestreams.Publisher;
import org.springframework.core.io.buffer.DataBuffer;
import reactor.core.publisher.Flux;


import java.nio.ByteBuffer;

public class FluxAsyncInputStream implements AsyncInputStream {

  private final Flux<DataBuffer> source;

  public FluxAsyncInputStream(Flux<DataBuffer> source) {
    this.source = source;
  }

  @Override
  public Publisher<Integer> read(ByteBuffer dst) {
    return null;
  }

  @Override
  public Publisher<Success> close() {
    return null;
  }
}
