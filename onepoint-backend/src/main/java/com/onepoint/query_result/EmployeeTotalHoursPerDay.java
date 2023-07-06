package com.onepoint.query_result;

import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class EmployeeTotalHoursPerDay {

    private Long employeeId;
    private String workDate;
    private Double totalWorkingHours;

}
