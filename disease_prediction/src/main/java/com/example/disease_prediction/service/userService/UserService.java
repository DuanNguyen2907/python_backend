package com.example.disease_prediction.service.userService;

import com.example.disease_prediction.entity.User;
import com.example.disease_prediction.mapper.UserMapper;
import com.example.disease_prediction.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements BaseService {

    @Autowired
    UserMapper userMapper;
    public List<User> getAllUser(){
        return userMapper.findAll();
    }

    public User getUserById(Integer userId){
        return userMapper.getUserByID(userId);
    }
}
