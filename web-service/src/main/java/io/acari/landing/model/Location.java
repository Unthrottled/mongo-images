package io.acari.landing.model;

public class Location {
  private String _url;

  public Location() {
  }

  public Location(String _url) {
    this._url = _url;
  }

  public String get_url() {
    return _url;
  }

  public void set_url(String _url) {
    this._url = _url;
  }
}
