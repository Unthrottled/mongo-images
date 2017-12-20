package io.acari.images;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;


@Component
public class RouterComponent {
  private static final Logger LOGGER = LoggerFactory.getLogger(RouterComponent.class);

  @Bean
  public RouterFunction<?> landingRouterFunction() {
    return RouterFunctions.nest(RequestPredicates.path("/api"),
        RouterFunctions.route(RequestPredicates.GET("/butt"),
            request -> ServerResponse.ok().body(Mono.just("Hello Werld!\n"), String.class)));
  }
}
