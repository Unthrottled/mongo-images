package io.acari.landing.model;

public class ProjectRank implements Comparable<ProjectRank> {
  private String _rank;

  public ProjectRank() {
  }

  public ProjectRank(String _rank) {
    this._rank = _rank;
  }

  public String get_rank() {
    return _rank;
  }

  public void set_rank(String _rank) {
    this._rank = _rank;
  }

  @Override
  public int compareTo(ProjectRank projectRank) {
    return _rank.compareTo(projectRank._rank);
  }
}
