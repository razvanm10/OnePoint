package com.onepoint.domain;

import com.onepoint.enums.EmployeePositions;
import com.onepoint.enums.EmployeeRoles;

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

    @Column
    private EmployeePositions position;

    @Column
    private Integer managerId;

    public Employee(){};

    public Employee(Long id, String name, UUID keycloakId, List<Integer> roles) {
        this.id = id;
        this.name = name;
        this.keycloakId = keycloakId;
        this.roles = roles;
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

    public Integer getManagerId() {
        return managerId;
    }

    public void setManagerId(Integer managerId) {
        this.managerId = managerId;
    }

    public EmployeePositions getPosition() {
        return position;
    }

    public void setPosition(EmployeePositions position) {
        this.position = position;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Objects.equals(id, employee.id) && Objects.equals(name, employee.name) && Objects.equals(keycloakId, employee.keycloakId) && Objects.equals(roles, employee.roles) && position == employee.position;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, keycloakId, roles, position);
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", keycloakId=" + keycloakId +
                ", roles=" + roles +
                ", position=" + position +
                '}';
    }
}
