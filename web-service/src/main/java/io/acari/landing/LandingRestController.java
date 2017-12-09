package io.acari.landing;


import io.acari.landing.model.BaseProject;
import io.acari.landing.model.ResponseProject;
import io.acari.landing.project.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class LandingRestController {
  private static final Logger LOGGER = LoggerFactory.getLogger(LandingRestController.class);

  private final ImageHandler imageHandler;
  private final AllProjectHandler allProjectHandler;
  private final ProjectCreationHandler projectCreationHandler;
  private final ProjectUpdateHandler projectUpdateHandler;
  private final ProjectRemovalHandler projectRemovalHandler;

  @Autowired
  public LandingRestController(ImageHandler imageHandler,
                               AllProjectHandler allProjectHandler,
                               ProjectCreationHandler projectCreationHandler,
                               ProjectUpdateHandler projectUpdateHandler,
                               ProjectRemovalHandler projectRemovalHandler) {
    this.imageHandler = imageHandler;
    this.allProjectHandler = allProjectHandler;
    this.projectCreationHandler = projectCreationHandler;
    this.projectUpdateHandler = projectUpdateHandler;
    this.projectRemovalHandler = projectRemovalHandler;
  }


  @GetMapping("")
  public Mono<String> fetchBase() {
    return Mono.just("Hello Werld!\n");
  }

  @PostMapping(value = "image/save", consumes = {
      MediaType.MULTIPART_FORM_DATA_VALUE,
      MediaType.IMAGE_PNG_VALUE,
      MediaType.IMAGE_JPEG_VALUE,
      MediaType.IMAGE_GIF_VALUE,
      MediaType.APPLICATION_FORM_URLENCODED_VALUE,

  })
  public Mono<String> saveImage(@RequestPart MultipartFile reach) {
    return imageHandler.saveImage(reach);
  }

  @RequestMapping(value = "image/get/{id}", produces = {MediaType.IMAGE_PNG_VALUE,
      MediaType.IMAGE_JPEG_VALUE,
      MediaType.IMAGE_GIF_VALUE})
  public Mono<byte[]> fetchImage(@PathVariable("id") String id) {
    return imageHandler.fetchImageBinary(id);
  }


  @PostMapping(value = "project/create", consumes = MediaType.APPLICATION_JSON_VALUE)
  public Mono<ResponseProject> saveProject(@RequestBody BaseProject newProject) {
    return projectCreationHandler.create(Mono.just(newProject));
  }

  @DeleteMapping(value = "project/delete/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
  public Mono<String> deleteProject(@PathVariable("id") String projectId) {
    return projectRemovalHandler.removeProject(Mono.just(projectId));
  }

  @PostMapping(value = "project/update", consumes = MediaType.APPLICATION_JSON_VALUE)
  public Mono<ResponseProject> updateProject(@RequestBody ResponseProject newProject) {
    return projectUpdateHandler.updateProject(Mono.just(newProject));
  }

  @GetMapping(value = "projects", produces = MediaType.APPLICATION_JSON_VALUE)
  public Flux<ResponseProject> allProjects() {
    return allProjectHandler.findAll();
  }
}
