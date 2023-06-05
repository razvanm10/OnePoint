package com.onepoint.service;

import com.onepoint.dto.EmployeeDTO;
import com.onepoint.mapper.EmployeeMapper;
import com.onepoint.repository.EmployeesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeesRepository employeesRepository;

    private final EmployeeMapper employeeMapper;

    public Optional<EmployeeDTO> findById(Long id) {
        return employeesRepository.findById(id).map(employeeMapper::toDTO);
    }

    public EmployeeDTO findByKeycloakId(UUID keycloakId) {
        return employeeMapper.toDTO(employeesRepository.findByKeycloakId(keycloakId));
    }

    public List<EmployeeDTO> findAllEmployees() {
        return employeesRepository.findAll()
                .stream()
                .filter(emp -> !emp.getRoles().contains(1))
                .map(employeeMapper::toDTO)
                .collect(Collectors.toList());
    }

}
