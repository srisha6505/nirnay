package com.example.legalcases.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class CaseController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/cases")
    public List<Map> getCases() {
        return mongoTemplate.findAll(Map.class, "saved_cases");
    }

    @PostMapping("/cases")
    public Map<String, Object> createCase(
        @RequestBody Map<String, Object> newCase
    ) {
        mongoTemplate.insert(newCase, "saved_cases");
        return newCase;
    }
}
