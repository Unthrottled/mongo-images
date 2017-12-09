package io.acari.landing.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class MongoProject extends BaseProject {

  @Id
  private ObjectId _id;

  public MongoProject(Reach reach, ProjectRank rank, Background background, Description description, Location location) {
    super(reach, rank, background, description, location);
  }

  public MongoProject(){

  }

  public MongoProject(BaseProject baseProject){
    super(baseProject.getReach(), baseProject.getRank(), baseProject.getBackground(), baseProject.getDescription(), baseProject.getLocation());
  }

  public MongoProject(ResponseProject baseProject){
    super(baseProject.getReach(), baseProject.getRank(), baseProject.getBackground(), baseProject.getDescription(), baseProject.getLocation());
    this._id = new ObjectId(baseProject.getIdentifier().get_id());
  }

  public ObjectId get_id() {
    return _id;
  }

  public void set_id(ObjectId _id) {
    this._id = _id;
  }

  public String getImageId(){
    return this.getReach().getId();
  }

  public String getProjectId(){
    return this._id.toHexString();
  }


}


