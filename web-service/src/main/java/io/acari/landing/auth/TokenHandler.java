package io.acari.landing.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;

@Component
public class TokenHandler {

  private final AuthenticationManager authenticationManager;

  public TokenHandler(AuthenticationManager authenticationManager) {
    this.authenticationManager = authenticationManager;
  }

  public Mono<String> handleUser(ApplicationUser maybeAlex) {
    return Mono.just(authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            maybeAlex.getUsername(),
            maybeAlex.getPassword(),
            new ArrayList<>())))
        .filter(Authentication::isAuthenticated)
        //Is Alex!!
        .map(auth -> maybeAlex.getUsername())
        .map(TokenGenerator::generateToken)
        .switchIfEmpty(Mono.error(new AccessDeniedException("YOU SHALL NOT PASS!!")));
  }
}
