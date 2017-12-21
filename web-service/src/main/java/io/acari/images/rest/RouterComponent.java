package io.acari.images.rest;

import io.acari.images.handler.ImageHandler;
import io.acari.images.model.Identifier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;


@Component
public class RouterComponent {
  private static final Logger LOGGER = LoggerFactory.getLogger(RouterComponent.class);

  private final ImageHandler imageHandler;

  @Autowired
  public RouterComponent(ImageHandler imageHandler) {
    this.imageHandler = imageHandler;
  }

  @Bean
  public RouterFunction<?> landingRouterFunction() {
    return RouterFunctions.nest(RequestPredicates.path("/api"),
        RouterFunctions.route(RequestPredicates.GET("/images"),
            request -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(imageHandler.findAllNames(), Identifier.class))
            .andRoute(RequestPredicates.POST("/image/save"),
                request -> ServerResponse.ok()
                    .body(imageHandler.saveImage(request.bodyToFlux(Part.class)), String.class))
            .andRoute(RequestPredicates.GET("/image/get/{id}"),
                request -> ServerResponse.ok()
                    .body(BodyInserters.fromDataBuffers(
                        imageHandler.fetchImage(request.pathVariable("id")))))
            .andRoute(RequestPredicates.DELETE("/image/delete/{id}"),
                request -> ServerResponse.ok()
                    .body(imageHandler.removeImage(request.pathVariable("id")), Boolean.class))
    ).andOther(RouterFunctions.resources("/**", new ClassPathResource("static/")));
  }

}
