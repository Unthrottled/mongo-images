package io.acari.landing.project;

import io.acari.landing.model.BaseProject;
import io.acari.landing.model.MongoProject;
import io.acari.landing.model.ResponseProject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class ProjectCreationHandler {

  private final ProjectRepository projectRepository;

  @Autowired
  public ProjectCreationHandler(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
  }

  public Mono<ResponseProject> create(Mono<BaseProject> newProject){
    return newProject.map(MongoProject::new)
        .flatMap(this.projectRepository::save)
        .map(ResponseProject::new);
    }
}
