package com.onepoint.service;

import com.onepoint.dto.EmployeeDTO;
import com.onepoint.mapper.EmployeeMapper;
import com.onepoint.repository.EmployeesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeesRepository employeesRepository;

    private final EmployeeMapper employeeMapper;

    public Optional<EmployeeDTO> findById(Long id) {
        return employeesRepository.findById(id).map(employeeMapper::toDTO);
    }


}
