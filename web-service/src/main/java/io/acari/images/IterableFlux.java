package io.acari.images;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.MonoSink;

import java.util.LinkedList;
import java.util.Queue;
import java.util.function.Consumer;

public class IterableFlux {
  private final Queue<String> bufferedList = new LinkedList<>();
  private final Queue<MonoSink<String>> callables = new LinkedList<>();
  private boolean complete = false;

  public IterableFlux(Flux<String> source) {
    Flux<String> messaged = Flux.create(stringFluxSink -> {
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
    messaged.subscribe();

  }

  public Mono<String> onNext() {
    if(complete && bufferedList.isEmpty()){
      return Mono.empty();
    } else if(bufferedList.isEmpty()){
      final Consumer<MonoSink<String>> stringConsumer = callables::offer;
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
}
