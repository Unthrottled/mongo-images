package io.acari.landing.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.User;

import java.util.Date;

import static io.acari.landing.auth.SecurityUtils.EXPIRATION_TIME;

public class TokenGenerator {


  public static String generateToken(String username){
    return Jwts.builder()
        .setSubject(username)
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
        .signWith(SignatureAlgorithm.HS512, AuthConfigs.Configs.SECRET.getValue().getBytes())
        .compact();
  }
}
