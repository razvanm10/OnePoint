package com.onepoint.service;

import com.onepoint.domain.Customer;
import com.onepoint.domain.Employee;
import com.onepoint.domain.Worklog;
import com.onepoint.dto.EmployeeDTO;
import com.onepoint.dto.WorklogDTO;
import com.onepoint.mapper.CustomerMapper;
import com.onepoint.mapper.EmployeeMapper;
import com.onepoint.mapper.WorklogMapper;
import com.onepoint.repository.WorklogsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorklogsService {

    private final WorklogsRepository worklogsRepository;

    private final WorklogMapper worklogMapper;

    private final EmployeeService employeeService;

    private final EmployeeMapper employeeMapper;

    private final CustomerService customerService;

    private final CustomerMapper customerMapper;

    public Optional<WorklogDTO> findById(Long id) {
        return worklogsRepository.findById(id).map(worklogMapper::toDTO);
    }

    public void save(WorklogDTO worklogDTO) throws IllegalArgumentException {
        Optional<EmployeeDTO> employee = employeeService.findById(worklogDTO.getEmployeeId());
        employee.map(el ->
            worklogsRepository.findAllByEmployee(employeeMapper.toEntity(el))
                    .stream()
                    .peek(worklog -> worklog.overlaps(worklog))
        );
        worklogsRepository.save(worklogMapper.toEntity(worklogDTO));
    }

    public List<WorklogDTO> findAllByEmployeeId(Long employeeId) {
        Optional<Employee> employee = employeeService.findById(employeeId)
                .map(employeeMapper::toEntity);

        return employee.map(value -> worklogsRepository.findAllByEmployee(value)
                .stream()
                .map(worklogMapper::toDTO)
                .collect(Collectors.toList()))
                .orElseGet(List::of);
    }

    public List<WorklogDTO> findAllByCustomerId(Long customerId) {
        Optional<Customer> customer = customerService.findById(customerId)
                .map(customerMapper::toEntity);

        return customer.map(value -> worklogsRepository.findAllByCustomer(value)
                .stream()
                .map(worklogMapper::toDTO)
                .collect(Collectors.toList()))
                .orElseGet(List::of);
    }

    public void delete(Long id) {
        Optional<Worklog> worklog = worklogsRepository.findById(id);
        worklog.ifPresent(worklogsRepository::delete);
    }

}
