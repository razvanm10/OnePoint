package com.onepoint.repository;

import com.onepoint.domain.Customer;
import com.onepoint.domain.Employee;
import com.onepoint.domain.Worklog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorklogsRepository extends JpaRepository<Worklog, Long> {

    List<Worklog> findAllByEmployee(Employee employee);

    List<Worklog> findAllByCustomer(Customer customer);

}
