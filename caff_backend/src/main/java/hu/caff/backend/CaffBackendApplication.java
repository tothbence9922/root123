package hu.caff.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@Configuration
@EnableJpaRepositories(basePackages = {"hu.caff.backend"})
public class CaffBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(CaffBackendApplication.class, args);
	}

}
