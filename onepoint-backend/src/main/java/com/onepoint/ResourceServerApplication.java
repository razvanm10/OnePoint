package com.onepoint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"com.okta.java.resourceserver.repository"})
public class ResourceServerApplication {

	@Bean
	public RestTemplate restTemplate(){ return new RestTemplate(); }

	public static void main(String[] args) {
		SpringApplication.run(ResourceServerApplication.class, args);
	}

}
