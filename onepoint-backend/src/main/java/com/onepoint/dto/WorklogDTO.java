package com.onepoint.dto;

import com.onepoint.domain.Worklog;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorklogDTO {

    private Long id;

    private ZonedDateTime day;

    private Integer start;

    private Integer stop;

    private String description;

    private Long employeeId;

    private Long customerId;

    public void overlaps(WorklogDTO other) throws IllegalArgumentException {
        //11:10-12:25 ->add-> 11:45-12:10 (second overlaps first)
        if (other.start > this.start && other.stop < this.stop) {
            throw new IllegalArgumentException("Worklogs are overlapping");
        };
    }

}
