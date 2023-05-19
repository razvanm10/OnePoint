package com.onepoint.repository;

import com.onepoint.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EmployeesRepository extends JpaRepository<Employee, Long> {

    Employee findByKeycloakId(UUID keycloakId);

}
