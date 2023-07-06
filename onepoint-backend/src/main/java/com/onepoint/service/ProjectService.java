package com.onepoint.service;

import com.onepoint.domain.Project;
import com.onepoint.dto.ProjectDTO;
import com.onepoint.mapper.ProjectMapper;
import com.onepoint.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public List<ProjectDTO> findAllProjectsByCustomerId(Long customerId) {
        List<Project> projects = projectRepository.findByCustomerId(customerId);
        return projects.stream().map(projectMapper::toDTO).collect(Collectors.toList());
    }

    public List<ProjectDTO> findAll() {
        List<Project> projects = projectRepository.findAll();
        return projects.stream().map(projectMapper::toDTO).collect(Collectors.toList());
    }

    public ProjectDTO findById(Long id) {
        return projectMapper.toDTO(projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found " + id)));
    }

    public ProjectDTO saveProject(ProjectDTO projectDTO) {
        Project project = projectMapper.toEntity(projectDTO);
        Project savedProject = projectRepository.save(project);
        return projectMapper.toDTO(savedProject);
    }

    public ProjectDTO updateProject(ProjectDTO projectDTO) {
        Project project = projectMapper.toEntity(projectDTO);
        Project updatedProject = projectRepository.save(project);
        return projectMapper.toDTO(updatedProject);
    }

    public void deleteProject(Long projectId) {
        projectRepository.deleteById(projectId);
    }

    public ProjectDTO findProjectById(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));
        return projectMapper.toDTO(project);
    }
}
