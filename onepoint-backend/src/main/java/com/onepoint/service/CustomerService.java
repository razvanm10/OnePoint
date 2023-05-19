package com.onepoint.service;

import com.onepoint.dto.CustomerDTO;
import com.onepoint.mapper.CustomerMapper;
import com.onepoint.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    private final CustomerMapper customerMapper;

    public Optional<CustomerDTO> findById(Long id) {
        return customerRepository.findById(id).map(customerMapper::toDTO);
    }

    public List<CustomerDTO> findAll() {
        return customerRepository.findAll()
                .stream()
                .map(customerMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void save(CustomerDTO customerDTO) {
        customerRepository.save(customerMapper.toEntity(customerDTO));
    }


}
