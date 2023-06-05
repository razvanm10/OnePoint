package com.onepoint.mapper;

import com.onepoint.domain.Employee;
import com.onepoint.dto.EmployeeDTO;
import com.onepoint.enums.EmployeePositions;
import org.mapstruct.Mapper;

import java.util.Arrays;

@Mapper(componentModel = "spring", uses = {ReferenceMapper.class})
public interface EmployeeMapper {

    Employee fromId(Long id);

    default Long getEmployeeId(Employee employee) {
        return employee.getId();
    }

    default Integer map(EmployeePositions value) {
        return value.ordinal();
    }

    default EmployeePositions map(Integer value) {
        return Arrays.stream(EmployeePositions.values())
                .filter(el -> el.ordinal() == value)
                .findAny().get();
    }

    EmployeeDTO toDTO(Employee employee);

    Employee toEntity(EmployeeDTO employee);

}
