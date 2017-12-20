package io.acari.images;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
public class RootForwarder implements WebFilter {
  @Override
  public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
    ServerHttpRequest request = exchange.getRequest();
    if (request.getURI().getPath().equals("/")) {
      return chain.filter(exchange.mutate().request(request.mutate().path("/index.html").build()).build());
    }

    return chain.filter(exchange);
  }
}
