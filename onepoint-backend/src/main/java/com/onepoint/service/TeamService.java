package com.onepoint.service;

import com.onepoint.domain.Team;
import com.onepoint.dto.TeamDTO;
import com.onepoint.mapper.TeamMapper;
import com.onepoint.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;

    private final EmployeeService employeeService;

    public List<TeamDTO> getAllTeams() {
        List<Team> teams = teamRepository.findAll();
        return teams.stream()
                .map(teamMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<TeamDTO> findById(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        return team.map(teamMapper::toDTO);
    }

    public TeamDTO save(TeamDTO teamDTO) {
        Team team = teamMapper.toEntity(teamDTO);
        Team createdTeam = teamRepository.save(team);
        return teamMapper.toDTO(createdTeam);
    }

    public TeamDTO addEmployeeToTheTeam(Long employeeId, Long teamId) {
        TeamDTO team = teamMapper.toDTO(teamRepository.findById(teamId)
                .orElseThrow(() -> new EntityNotFoundException("Team not found for id = " + teamId)));

        employeeService.assignTeam(teamId, employeeId);


        return team;
    }


    public void deleteById(Long id) {
        teamRepository.deleteById(id);
    }
}
