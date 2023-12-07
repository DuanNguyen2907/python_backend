package com.example.disease_prediction.mapper;

import com.example.disease_prediction.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("select * from users")
    List<User> findAll();
    @Select("select * from users where id = #{userId}")
    User getUserByID(Integer userId);

}
