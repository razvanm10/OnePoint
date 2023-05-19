package com.onepoint.domain;

import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.Objects;

@Entity
@Table
public class Worklog {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column
    private Integer start;

    @Column
    private Integer stop;

    @Column
    private ZonedDateTime day;

    @Column
    private String description;

    @OneToOne
    private Employee employee;

    @OneToOne
    private Customer customer;

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public ZonedDateTime getDay() {
        return day;
    }

    public void setDay(ZonedDateTime day) {
        this.day = day;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getStart() {
        return start;
    }

    public void setStart(Integer start) {
        this.start = start;
    }

    public Integer getStop() {
        return stop;
    }

    public void setStop(Integer stop) {
        this.stop = stop;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Worklog worklog = (Worklog) o;
        return Objects.equals(id, worklog.id) && Objects.equals(start, worklog.start) && Objects.equals(stop, worklog.stop) && Objects.equals(day, worklog.day) && Objects.equals(description, worklog.description) && Objects.equals(employee, worklog.employee) && Objects.equals(customer, worklog.customer);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, start, stop, day, description, employee, customer);
    }

    public boolean overlaps(Worklog other) {
        //11:10-12:25 ->add-> 11:45-12:10 (second overlaps first)
        return other.start >= this.start && other.stop < this.stop;
    }
}