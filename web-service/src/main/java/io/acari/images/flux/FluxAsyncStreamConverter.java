package io.acari.images.flux;

import com.mongodb.reactivestreams.client.gridfs.AsyncInputStream;
import org.springframework.core.io.buffer.DataBuffer;
import reactor.core.publisher.Flux;



public class FluxAsyncStreamConverter {

  public static AsyncInputStream convert(Flux<DataBuffer> source){
    return new FluxAsyncInputStream(source);
  }
}
