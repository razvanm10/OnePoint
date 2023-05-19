package com.onepoint.mapper;
import com.onepoint.domain.Worklog;
import com.onepoint.dto.WorklogDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, CustomerMapper.class})
public interface WorklogMapper {

    @Mapping(source = "employee", target = "employeeId")
    @Mapping(source = "customer", target = "customerId")
    WorklogDTO toDTO(Worklog worklog);

    @Mapping(source = "employeeId", target = "employee")
    @Mapping(source = "customerId", target = "customer")
    Worklog toEntity(WorklogDTO worklogDTO);

}
