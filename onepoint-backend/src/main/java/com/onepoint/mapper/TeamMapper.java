package com.onepoint.mapper;

import com.onepoint.domain.Team;
import com.onepoint.dto.TeamDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, ReferenceMapper.class})
public interface TeamMapper {

    Team fromId(Long value);

    @Mapping(source = "manager.id", target = "managerId")
    TeamDTO toDTO(Team team);

    @Mapping(source = "managerId", target = "manager.id")
    Team toEntity(TeamDTO teamDTO);
}
