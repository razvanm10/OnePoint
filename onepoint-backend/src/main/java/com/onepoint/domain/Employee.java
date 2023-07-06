package com.onepoint.domain;

import com.onepoint.enums.EmployeePositions;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column
    private String name;

    @Column
    private UUID keycloakId;

    @ElementCollection
    private List<Integer> roles;

    @ElementCollection
    @Nullable
    private List<EmployeePositions> fittablePositions;

    @Column
    @Nullable
    private EmployeePositions currentPosition;

    public void setManagerId(@Nullable Long managerId) {
        this.managerId = managerId;
    }

    @Column
    @Nullable
    private Long managerId;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    public Employee(){};

    public Employee(Long id, String name, UUID keycloakId, List<Integer> roles, @Nullable List<EmployeePositions> fittablePositions, @Nullable EmployeePositions currentPosition, @Nullable Long managerId, Team team) {
        this.id = id;
        this.name = name;
        this.keycloakId = keycloakId;
        this.roles = roles;
        this.fittablePositions = fittablePositions;
        this.currentPosition = currentPosition;
        this.managerId = managerId;
        this.team = team;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UUID getKeycloakId() {
        return keycloakId;
    }

    public void setKeycloakId(UUID keycloakId) {
        this.keycloakId = keycloakId;
    }

    public List<Integer> getRoles() {
        return roles;
    }

    public void setRoles(List<Integer> roles) {
        this.roles = roles;
    }

    @Nullable
    public List<EmployeePositions> getFittablePositions() {
        return fittablePositions;
    }

    public void setFittablePositions(@Nullable List<EmployeePositions> fittablePositions) {
        this.fittablePositions = fittablePositions;
    }

    @Nullable
    public EmployeePositions getCurrentPosition() {
        return currentPosition;
    }

    public void setCurrentPosition(@Nullable EmployeePositions currentPosition) {
        this.currentPosition = currentPosition;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Objects.equals(id, employee.id) && Objects.equals(name, employee.name) && Objects.equals(keycloakId, employee.keycloakId) && Objects.equals(roles, employee.roles) && Objects.equals(fittablePositions, employee.fittablePositions) && currentPosition == employee.currentPosition && Objects.equals(managerId, employee.managerId) && Objects.equals(team, employee.team);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, keycloakId, roles, fittablePositions, currentPosition, managerId, team);
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", keycloakId=" + keycloakId +
                ", roles=" + roles +
                ", fittablePositions=" + fittablePositions +
                ", currentPosition=" + currentPosition +
                ", managerId=" + managerId +
                ", team=" + team +
                '}';
    }


}
