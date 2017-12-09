package io.acari.landing.model;

public class ResponseProject extends BaseProject {

    private final Identifier identifier;

    public ResponseProject() {
        identifier = new Identifier();
    }

    public ResponseProject(MongoProject mongoProject){
        super(mongoProject.getReach(), mongoProject.getRank(), mongoProject.getBackground(), mongoProject.getDescription(), mongoProject.getLocation());
        this.identifier = new Identifier(mongoProject.get_id().toHexString());
    }

    public Identifier getIdentifier() {
        return identifier;
    }
}
