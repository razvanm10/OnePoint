package com.onepoint.mapper;

import com.onepoint.domain.Employee;
import com.onepoint.dto.EmployeeDTO;
import com.onepoint.enums.EmployeePositions;
import com.onepoint.enums.EmployeeRoles;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Mapper(componentModel = "spring", uses = {ReferenceMapper.class, TeamMapper.class})
public interface EmployeeMapper {

    Employee fromId(Long id);

    default Long getEmployeeId(Employee employee) {
        return employee.getId();
    }

    default Integer map(EmployeePositions value) {
        if (value != null) {
            return value.getNumericValue();
        } else {
            return null;
        }
    }

    @Mapping(source = "team.id", target = "teamId")

    EmployeeDTO toDTO(Employee employee);

    @Mapping(source = "teamId", target = "team")
    Employee toEntity(EmployeeDTO employee);

    List<EmployeePositions> map(List<Integer> value);

    default EmployeePositions map(Integer value) {
        if (value == null) {
            return null;
        }
        return Arrays.stream(EmployeePositions.values())
                .filter(el -> Objects.equals(el.getNumericValue(), value))
                .findAny().orElseThrow(() -> new RuntimeException("Couldn't find a position that matches " + value));
    }
}
