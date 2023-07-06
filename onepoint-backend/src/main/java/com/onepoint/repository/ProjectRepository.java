package com.onepoint.repository;

import com.onepoint.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByCustomerId(Long customerId);
}
