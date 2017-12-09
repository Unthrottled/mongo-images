package io.acari.landing.project;

import io.acari.landing.model.MongoProject;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface ProjectRepository extends ReactiveCrudRepository<MongoProject, String> {

}
