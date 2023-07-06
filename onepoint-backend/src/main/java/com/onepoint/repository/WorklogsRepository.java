package com.onepoint.repository;

import com.onepoint.domain.Customer;
import com.onepoint.domain.Worklog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorklogsRepository extends JpaRepository<Worklog, Long> {

    @Query(value = "SELECT * FROM worklog WHERE employee_id = :employeeId", nativeQuery = true)
    List<Worklog> findAllByEmployeeId(Long employeeId);

    @Query("SELECT w FROM Worklog w WHERE w.employee.id = :employeeId AND w.day = :specifiedDate")
    List<Worklog> getWorklogsByEmployeeAndDay(@Param("employeeId") Long employeeId,
                                              @Param("specifiedDate") String specifiedDate);


    List<Worklog> findAllByCustomer(Customer customer);

}
