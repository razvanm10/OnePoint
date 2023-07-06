package com.onepoint.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {

    private int id;

    private String name;

    private UUID keycloakId;

    private List<Integer> roles;

    private List<Integer> fittablePositions;

    private Integer currentPosition;

    private Integer managerId;

    private Long teamId;

}
