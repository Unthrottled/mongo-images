package io.acari.landing.auth;


import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ApplicationUserRepository  {
	ApplicationUser findByUsername(String username){
			return Optional.ofNullable(username)
					.filter(u -> AuthConfigs.Configs.USERNAME.getValue().equals(u))
					.map(u -> new ApplicationUser(AuthConfigs.Configs.USERNAME.getValue(),
							AuthConfigs.Configs.PASSWORD.getValue()))
					.orElse(null);
	}
}
