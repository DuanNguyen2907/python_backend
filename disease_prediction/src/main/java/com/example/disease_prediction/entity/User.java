package com.example.disease_prediction.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
@Data
public class User {
    private String id;
    private String username;
    private Date dob;
    private String phone;
    private String role;
    private String email;
    private Timestamp createAt;
    private Timestamp updateAt;

    public User(String id, String username,  Date dob,String phone, String role, String email, Timestamp createAt, Timestamp updateAt) {
        this.id = id;
        this.username = username;
        this.phone = phone;
        this.dob = dob;
        this.role = role;
        this.email = email;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }
}
