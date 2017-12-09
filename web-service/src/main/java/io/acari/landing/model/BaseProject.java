package io.acari.landing.model;

public class BaseProject implements Comparable<BaseProject> {

    private Reach reach;
    private ProjectRank rank;
    private Background background;
    private Description description;
    private Location location;

    public BaseProject(){}

    public BaseProject(Reach reach, ProjectRank rank, Background background, Description description, Location location) {
        this.reach = reach;
        this.rank = rank;
        this.background = background;
        this.description = description;
        this.location = location;
    }

    public Reach getReach() {
        return reach;
    }

    public void setReach(Reach reach) {
        this.reach = reach;
    }

    public ProjectRank getRank() {
        return rank;
    }

    public void setRank(ProjectRank rank) {
        this.rank = rank;
    }

    public Background getBackground() {
        return background;
    }

    public void setBackground(Background background) {
        this.background = background;
    }

    public Description getDescription() {
        return description;
    }

    public void setDescription(Description description) {
        this.description = description;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    @Override
    public int compareTo(BaseProject baseProject) {
        return this.rank.compareTo(baseProject.getRank());
    }
}
