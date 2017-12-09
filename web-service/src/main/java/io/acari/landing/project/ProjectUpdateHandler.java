package io.acari.landing.project;

import io.acari.landing.model.MongoProject;
import io.acari.landing.model.ResponseProject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class ProjectUpdateHandler {

  private final ProjectRepository projectRepository;

  @Autowired
  public ProjectUpdateHandler(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
  }

  public Mono<ResponseProject> updateProject(Mono<ResponseProject> projcetToUpdate){
    return projcetToUpdate
        .map(MongoProject::new)
        .flatMap(this.projectRepository::save)
        .map(ResponseProject::new);
    }
}
