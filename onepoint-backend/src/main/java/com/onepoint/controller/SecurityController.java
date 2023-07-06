package com.onepoint.controller;

import com.onepoint.domain.Employee;
import com.onepoint.enums.EmployeeRoles;
import com.onepoint.repository.EmployeesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"})
public class SecurityController {

    private final EmployeesRepository employeesRepository;

    @GetMapping("/authorities")
    public Employee getPrincipalInfo(JwtAuthenticationToken principal) {

        Collection<String> authorities = principal.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        Map<String, Object> info = new HashMap<>();
        info.put("name", principal.getName());
        info.put("authorities", authorities);
        info.put("tokenAttributes", principal.getTokenAttributes());

        Map principalAttributes = (Map) info.get("tokenAttributes");
        List<String> principalRoles = ((List<String>) ((Map) principalAttributes.get("realm_access"))
                .get("roles"))
                .stream()
                .filter(el -> el.equals("EMPLOYEE") || el.equals("MANAGER") || el.equals("HEAD_OF_ADMINISTRATION"))
                .collect(Collectors.toList());


        Employee employee = new Employee();
        employee.setName(principalAttributes.get("name").toString());
        employee.setKeycloakId(UUID.fromString(info.get("name").toString()));
        employee.setRoles(principalRoles
                .stream()
                .filter(el -> el.equals("EMPLOYEE") || el.equals("MANAGER") || el.equals("HEAD_OF_ADMINISTRATION"))
                .map(el -> {
                    switch (el) {
                        case "EMPLOYEE":
                            return EmployeeRoles.EMPLOYEE.getNumericValue();
                        case "MANAGER":
                            return EmployeeRoles.MANAGER.getNumericValue();
                        case "HEAD_OF_ADMINISTRATION":
                            return EmployeeRoles.HEAD_OF_ADMINISTRATION.getNumericValue();
                    }
                    return EmployeeRoles.EMPLOYEE.getNumericValue();
                }).collect(Collectors.toList())
        );
        if (employeesRepository.findByKeycloakId(employee.getKeycloakId()) == null) {
            employee = employeesRepository.save(employee);
        } else {
            boolean hasAllThePrincipalRoles = new HashSet<>(principalRoles).containsAll(employeesRepository
                    .findByKeycloakId(employee.getKeycloakId())
                    .getRoles().stream().map(el -> {
                        switch (el) {
                            case 0:
                                return "EMPLOYEE";
                            case 1:
                                return "MANAGER";
                            case 2:
                                return "HEAD_OF_ADMINISTRATION";
                        }
                        return "EMPLOYEE";
                    }).collect(Collectors.toList()));

            if (!hasAllThePrincipalRoles) {
                employee.setRoles(principalRoles
                        .stream()
                        .filter(el -> el.equals("EMPLOYEE") || el.equals("MANAGER") || el.equals("HEAD_OF_ADMINISTRATION"))
                        .map(el -> {
                            switch (el) {
                                case "EMPLOYEE":
                                    return EmployeeRoles.EMPLOYEE.getNumericValue();
                                case "MANAGER":
                                    return EmployeeRoles.MANAGER.getNumericValue();
                                case "HEAD_OF_ADMINISTRATION":
                                    return EmployeeRoles.HEAD_OF_ADMINISTRATION.getNumericValue();
                            }
                            return EmployeeRoles.EMPLOYEE.getNumericValue();
                        }).collect(Collectors.toList())
                );
                if (employeesRepository.findByKeycloakId(employee.getKeycloakId()) != null) {
                    return employee;
                } else {
                    employeesRepository.save(employee);
                }
            }
        }
        return employee;
    }


}
