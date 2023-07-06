package com.onepoint.dto;

import com.onepoint.domain.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeamDTO {

    private Long id;
    private Long managerId;
    private List<Long> members;

}
