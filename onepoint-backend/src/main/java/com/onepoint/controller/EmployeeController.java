package com.onepoint.controller;

import com.onepoint.dto.EmployeeDTO;
import com.onepoint.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
@CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin","Access-Control-Allow-Credentials"})
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public List<EmployeeDTO> findAll() {
        return employeeService.findAllEmployees();
    }

    @GetMapping("keycloak/{keycloakId}")
    public ResponseEntity<EmployeeDTO> findByKeycloakId(@PathVariable UUID keycloakId) {
        return ResponseEntity.ok(employeeService.findByKeycloakId(keycloakId));
    }

}
