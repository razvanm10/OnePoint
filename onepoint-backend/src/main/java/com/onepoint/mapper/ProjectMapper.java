package com.onepoint.mapper;

import com.onepoint.domain.Project;
import com.onepoint.dto.ProjectDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {ReferenceMapper.class, CustomerMapper.class})
public interface ProjectMapper {

    Project fromId(Long id);

    default Long customerId(Project project){
        return project.getId();
    }

    @Mapping(source = "customer.id", target = "customerId")
    ProjectDTO toDTO(Project project);

    @Mapping(source = "customerId", target = "customer.id")
    Project toEntity(ProjectDTO projectDTO);
}
