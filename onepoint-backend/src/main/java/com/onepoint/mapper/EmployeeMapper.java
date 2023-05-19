package com.onepoint.mapper;

import com.onepoint.domain.Employee;
import com.onepoint.dto.EmployeeDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ReferenceMapper.class})
public interface EmployeeMapper {

    Employee fromId(Long id);

    default Long getEmployeeId(Employee employee) {
        return employee.getId();
    }

    EmployeeDTO toDTO(Employee employee);

    Employee toEntity(EmployeeDTO employee);

}
