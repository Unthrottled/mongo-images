package io.acari.images;

import com.mongodb.reactivestreams.client.Success;
import com.mongodb.reactivestreams.client.gridfs.AsyncInputStream;
import org.reactivestreams.Publisher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.buffer.DataBuffer;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


import java.nio.ByteBuffer;

/**
 * The Async Input Stream interface represents some asynchronous input stream of bytes.
 *
 */
public class FluxAsyncInputStream implements AsyncInputStream {
  private static final Logger LOGGER = LoggerFactory.getLogger(FluxAsyncInputStream.class);

  private final IterableFlux<DataBuffer> source;

  public FluxAsyncInputStream(Flux<DataBuffer> source) {
    //sure would be nice if I had the producer :\
    this.source = new IterableFlux<>(source);

  }

  /**
   * Reads a sequence of bytes from this stream into the given buffer.
   *
   * @param dst      the destination buffer
   * @return a publisher with a single element, the total number of bytes read into the buffer, or
   *         {@code -1} if there is no more data because the end of the stream has been reached.
   */
  @Override
  public Publisher<Integer> read(ByteBuffer dst) {
    return this.source.onNext()
        .map(dataBuffer -> {
          dst.put(dataBuffer.asByteBuffer());
          return dataBuffer.readableByteCount() <= 0 ? -1 : dataBuffer.readableByteCount();
        }).defaultIfEmpty(-1);
  }

  /**
   * Closes the input stream
   *
   * @return a publisher with a single element indicating when the stream has been closed
   */
  @Override
  public Publisher<Success> close() {
    return Mono.just(Success.SUCCESS);//The stream was never really open.
  }
}
