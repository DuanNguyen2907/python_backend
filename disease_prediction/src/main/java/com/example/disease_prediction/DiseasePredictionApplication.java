package com.example.disease_prediction;

import com.example.disease_prediction.entity.User;
import org.apache.ibatis.type.MappedTypes;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MappedTypes(User.class)
@MapperScan("com.example.disease_prediction.mapper")
@SpringBootApplication
public class DiseasePredictionApplication {

	public static void main(String[] args) {
		SpringApplication.run(DiseasePredictionApplication.class, args);
	}

}
