package io.acari.landing.project;

import io.acari.landing.model.ResponseProject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

@Component
public class AllProjectHandler {

  private final ProjectRepository projectRepository;

  @Autowired
  public AllProjectHandler(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
  }

  public Flux<ResponseProject> findAll(){
    return this.projectRepository.findAll()
        .map(ResponseProject::new)
        .sort(ResponseProject::compareTo);
    }
}
