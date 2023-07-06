package com.onepoint.mapper;
import com.onepoint.domain.Worklog;
import com.onepoint.dto.WorklogDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, CustomerMapper.class, ReferenceMapper.class, ProjectMapper.class})
public interface WorklogMapper {

    @Mapping(source = "employee", target = "employeeId")
    @Mapping(source = "customer", target = "customerId")
    @Mapping(source = "project", target = "projectId")
    WorklogDTO toDTO(Worklog worklog);

    @Mapping(source = "employeeId", target = "employee")
    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "projectId", target = "project")
    Worklog toEntity(WorklogDTO worklogDTO);

}
