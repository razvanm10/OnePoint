package com.onepoint.domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column
    private String name;

    @OneToOne
    private Customer customer;

    public Project(Long id, String name, Customer customer) {
        this.id = id;
        this.name = name;
        this.customer = customer;
    }


    public Project() {

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

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return Objects.equals(id, project.id) && Objects.equals(name, project.name) && Objects.equals(customer, project.customer);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, customer);
    }
}
