package io.acari.images;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.util.stream.Stream;

@Component
public class RouterComponent {

  @Bean
  public RouterFunction<ServerResponse> landingRouterFunction(){
    return RouterFunctions.route(RequestPredicates.GET("butt"),
            request -> ServerResponse.ok().body(Mono.just("Hello Werld!\n"), String.class));
  }
}
