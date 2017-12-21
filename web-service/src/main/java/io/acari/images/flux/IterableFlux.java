package io.acari.images.flux;

import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.MonoSink;

import java.util.LinkedList;
import java.util.Queue;
import java.util.function.Consumer;

public class IterableFlux<T> {
  private final Queue<T> bufferedList = new LinkedList<>();
  private final Queue<MonoSink<T>> callables = new LinkedList<>();
  private boolean complete = false;
  private final Disposable disposable;

  public IterableFlux(Flux<T> source) {
    Flux<T> messaged = Flux.create(stringFluxSink -> {
      source.subscribe(a -> {
            if (callables.isEmpty()) {
              stringFluxSink.next(a);
              bufferedList.offer(a);
            } else {
              callables.poll().success(a);
            }
          },
          this::accept,
          this::run);
    });
    disposable = messaged.subscribe();
  }


  public Mono<T> onNext() {
    if(complete && bufferedList.isEmpty()){
      return Mono.empty();
    } else if(bufferedList.isEmpty()){
      final Consumer<MonoSink<T>> stringConsumer = callables::offer;
      return Mono.create(stringConsumer);
    } else {
      return Mono.just(bufferedList.poll());
    }
  }

  private void accept(Throwable b) {
    callables.forEach(a -> a.error(b));
  }

  private void run() {
    callables.forEach(MonoSink::success);
    complete = true;
  }

  public void dispose(){
    disposable.dispose();
    callables.forEach(MonoSink::success);
  }

}
