package com.onepoint.mapper;


import com.onepoint.domain.Customer;
import com.onepoint.dto.CustomerDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ReferenceMapper.class})
public interface CustomerMapper {

    Customer fromId(Long id);

    default Long customerId(Customer customer){
        return customer.getId();
    }

    CustomerDTO toDTO(Customer customer);

    Customer toEntity(CustomerDTO customerDTO);

}
