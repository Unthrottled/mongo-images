package io.acari.images.mono;

import reactor.core.publisher.MonoSink;

public class MonoSinkHelper<T>{

  private final MonoSink<T> monoSink;
  private boolean disposed = false;

  public MonoSinkHelper(MonoSink<T> monoSink) {
    this.monoSink = monoSink;
    monoSink.onDispose(this::disposed);
  }

  public void success(){
    this.monoSink.success();
  }

  public void success(T t){
    this.monoSink.success(t);
  }

  public void error(Throwable t){
    this.monoSink.error(t);
  }

  public boolean isDisposed() {
    return disposed;
  }

  private void disposed() {
    disposed = true;
  }
}
