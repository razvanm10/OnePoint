package com.onepoint.controller;

import com.onepoint.dto.WorklogDTO;
import com.onepoint.service.WorklogsService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.ws.rs.core.MediaType;


import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/worklogs", consumes = MediaType.APPLICATION_JSON, produces = MediaType.APPLICATION_JSON)
@RequiredArgsConstructor
@CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin","Access-Control-Allow-Credentials"})
public class WorklogsController {

    private final WorklogsService worklogsService;

    @PostMapping(value = "/add",
            consumes = {MediaType.APPLICATION_JSON},
            produces = {MediaType.APPLICATION_JSON})
    public ResponseEntity<Void> addNewWorklogForEmployee(@RequestBody WorklogDTO worklogDTO) {
        try {
            worklogsService.save(worklogDTO);
            return ResponseEntity.created(URI
                    .create(String.format("/worklog/%s", worklogDTO.getDescription()))).build();
        } catch (IllegalArgumentException e) {
            System.out.println("I'm here");
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "/{employeeId}",
            consumes = {MediaType.APPLICATION_JSON},
            produces = {MediaType.APPLICATION_JSON})

    public ResponseEntity<List<WorklogDTO>> findAllWorklogsForEmployee(@PathVariable Long employeeId) {
        try {
            return ResponseEntity.ok(worklogsService.findAllByEmployeeId(employeeId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "/",
            consumes = {MediaType.APPLICATION_JSON},
            produces = {MediaType.APPLICATION_JSON})
    @CrossOrigin(origins = {"http://localhost:3000"})

    public ResponseEntity<List<WorklogDTO>> findAll() {
        return ResponseEntity.ok(List.of());
    }

}
