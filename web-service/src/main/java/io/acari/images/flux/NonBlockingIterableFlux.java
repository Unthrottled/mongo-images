package io.acari.images.flux;

import com.google.common.base.Preconditions;
import io.acari.images.mono.MonoSinkHelper;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.MonoSink;

import java.util.LinkedList;
import java.util.Queue;
import java.util.function.Consumer;

public class NonBlockingIterableFlux<T> implements Disposable {
    private final Queue<T> itemBuffer = new LinkedList<>();
    private final Queue<MonoSinkHelper<T>> callables = new LinkedList<>();
    private final Flux<T> source;
    private Disposable subscription;
    private boolean complete = false;

    /**
     * Stateful class, which allows for non-blocking
     * sequential access to items in provided flux stream.
     * <p>
     * It is a hot observable that buffers when it has
     * backpressure. It guarantees that all items where delivered
     * to somebody.
     * <p>
     * It will subscribe to the source only when the first Mono<T>
     * has a subscription.
     *
     * @param source non-null flux source.
     * @throws NullPointerException when given null source
     */
    public NonBlockingIterableFlux(Flux<T> source) {
        Preconditions.checkNotNull(source);
        this.source = source;
    }

    /**
     * Cancel or dispose the underlying task or resource.
     */
    public void dispose() {
        subscription.dispose();
        callables.forEach(MonoSinkHelper::success);
    }

    /**
     * Think of this like a "Take a Number" queue.
     * When you `takeNext()` you are essentially asking
     * to be served when your number is called.
     * The order at which this is called determines what
     * item you get in the flux, ie the first call get the first element
     * and the second call gets the second item in the flux.
     * <p>
     * <p>
     * Some people ahead of you may leave, that's okay,
     * because you will get their item.
     * <p>
     * <p>
     * If you take a number that cannot fulfilled
     * (the flux handed out all of it's items),
     * you will be notified by an empty return.
     *
     * @return An item in the flux based off of the current queue of callbacks.
     * or nothing if the flux has completeStream out of items.
     */
    public Mono<T> takeNext() {
        if (complete && itemBuffer.isEmpty()) {
            return Mono.empty();
        } else if (itemBuffer.isEmpty()) {
            return createCallback();
        } else {
            return Mono.just(itemBuffer.poll());
        }
    }

    private Mono<T> createCallback() {
        final Consumer<MonoSink<T>> tConsumer = tMonoSink -> {
            if (itemBuffer.isEmpty()) {
                callables.offer(new MonoSinkHelper<>(tMonoSink));
            } else {
                tMonoSink.success(itemBuffer.poll());
            }
        };
        return Mono.create(tConsumer)
                .doOnSubscribe(sub -> subscribeToSource());
    }

    private void jettisonNextItem(T t) {
        if (callables.isEmpty()) {
            bufferItem(t);
        } else {
            emitToNextSubscribedCaller(t);
        }
    }

    private void bufferItem(T a) {
        itemBuffer.offer(a);
    }

    private void emitToNextSubscribedCaller(T a) {
        MonoSinkHelper<T> nextPersonInLine = callables.poll();
        if (nextPersonInLine.isDisposed()) {
            jettisonNextItem(a);
        } else {
            nextPersonInLine.success(a);
        }
    }

    private void subscribeToSource() {
        if (this.subscription == null) {
            subscription = source.subscribe(this::jettisonNextItem,
                    this::accept,
                    this::completeStream);
        }
    }

    private void accept(Throwable throwable) {
        callables.forEach(callable -> callable.error(throwable));
    }

    private void completeStream() {
        callables.forEach(MonoSinkHelper::success);
        complete = true;
    }
}
