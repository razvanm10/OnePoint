package com.onepoint.controller;

import jakarta.ws.rs.core.MediaType;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(path = "/api", consumes = MediaType.APPLICATION_JSON, produces = MediaType.APPLICATION_JSON)
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class TestController {

    @GetMapping(value = "/employee")
    public ResponseEntity<HashMap<String, String>> getEmployee() {
        var response = new HashMap<String, String>();
        response.put("employee", "Razvan");
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/employee")
    public ResponseEntity<HashMap<String, String>> createEmployee() {
        var response = new HashMap<String, String>();
        response.put("employee", "Razvan");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping(value = "/employee")
    public ResponseEntity<HashMap<String, String>> deleteEmployee() {
        var response = new HashMap<String, String>();
        response.put("employee", "Razvan");
        return ResponseEntity.ok(response);
    }


    @PutMapping(value = "/employee")
    public ResponseEntity<HashMap<String, String>> updateEmployee() {
        var response = new HashMap<String, String>();
        response.put("employee", "Razvan");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
    }

    @GetMapping("/manager")
    public String getManager() {
        return "Manager";
    }


}
