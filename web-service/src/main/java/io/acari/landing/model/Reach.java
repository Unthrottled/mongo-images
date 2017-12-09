package io.acari.landing.model;

public class Reach {

  private Identifier _identifier;

  public Reach() {
  }

  public Reach(Identifier _identifier) {
    this._identifier = _identifier;
  }

  public Identifier get_identifier() {
    return _identifier;
  }

  public void set_identifier(Identifier _identifier) {
    this._identifier = _identifier;
  }

  public String getId() {
    return _identifier.get_id();
  }
}
