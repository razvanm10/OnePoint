package com.onepoint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"com.onepoint.repository"})
public class ResourceServerApplication {

	@Bean
	public RestTemplate restTemplate(){ return new RestTemplate(); }

	public static void main(String[] args) {
		SpringApplication.run(ResourceServerApplication.class, args);
	}

}
