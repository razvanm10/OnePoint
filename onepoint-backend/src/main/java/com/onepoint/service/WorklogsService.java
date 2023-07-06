package com.onepoint.service;

import com.onepoint.domain.Customer;
import com.onepoint.domain.Worklog;
import com.onepoint.dto.WorklogDTO;
import com.onepoint.mapper.CustomerMapper;
import com.onepoint.mapper.WorklogMapper;
import com.onepoint.repository.WorklogsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class WorklogsService {

    private final WorklogsRepository worklogsRepository;

    private final WorklogMapper worklogMapper;

    private final CustomerService customerService;

    private final CustomerMapper customerMapper;

    private final TimeRangeService timeRangeService;

    public Optional<WorklogDTO> findById(Long id) {
        return worklogsRepository.findById(id).map(worklogMapper::toDTO);
    }

    public void save(WorklogDTO worklogDTO) throws IllegalArgumentException {
        worklogsRepository.findAllByEmployeeId(worklogDTO.getEmployeeId())
                .forEach(worklog ->
                        timeRangeService.checkOverlapping(worklogMapper.toDTO(worklog), worklogDTO));
        worklogsRepository.save(worklogMapper.toEntity(worklogDTO));
    }

    public double findAllWorklogsGrouppedByDayOfMonth
            (Long id, String specifiedDate) {
        List<Worklog> worklogs = worklogsRepository.getWorklogsByEmployeeAndDay(id, specifiedDate);
        double totalWorkingHours = 0.0;

        for (Worklog worklog : worklogs) {
            int startHour = worklog.getStart() / 100;
            int startMinute = worklog.getStart() % 100;
            int stopHour = worklog.getStop() / 100;
            int stopMinute = worklog.getStop() % 100;

            if (startHour == stopHour) {
                totalWorkingHours += (stopMinute - startMinute) / 60.0;
            } else {
                totalWorkingHours += (stopHour - startHour) + (stopMinute - startMinute) / 60.0;
            }
        }
        return totalWorkingHours;
    }

    public List<WorklogDTO> findAllByEmployeeId(Long employeeId) {
        return worklogsRepository.findAllByEmployeeId(employeeId)
                .stream()
                .map(worklogMapper::toDTO)
                .collect(Collectors.toList());
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
