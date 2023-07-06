package com.onepoint.domain;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne
    private Employee manager;

    @OneToMany(mappedBy = "team")
    private List<Employee> members;

    public Team(){};

    public Team(Long id, Employee manager, List<Employee> members) {
        this.id = id;
        this.manager = manager;
        this.members = members;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getManager() {
        return manager;
    }

    public void setManager(Employee manager) {
        this.manager = manager;
    }

    public List<Employee> getMembers() {
        return members;
    }

    public void setMembers(List<Employee> members) {
        this.members = members;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Team team = (Team) o;
        return Objects.equals(id, team.id) && Objects.equals(manager, team.manager) && Objects.equals(members, team.members);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, manager, members);
    }

    @Override
    public String toString() {
        return "Team{" +
                "id=" + id +
                ", manager=" + manager +
                ", members=" + members +
                '}';
    }
}
