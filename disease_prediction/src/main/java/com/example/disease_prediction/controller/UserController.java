package com.example.disease_prediction.controller;

import com.example.disease_prediction.entity.User;
import com.example.disease_prediction.service.userService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUser(){
        return ResponseEntity.ok(userService.getAllUser());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id")  Integer userId){
        return ResponseEntity.ok(userService.getUserById(userId));
    }
}
