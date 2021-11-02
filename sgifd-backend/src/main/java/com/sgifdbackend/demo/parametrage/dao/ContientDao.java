package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.Continent;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContientDao extends JpaRepository<Continent, Long> {
	Continent findById(String id);
	Continent findByIdLike(String id);
    List<Continent> findByStatus(Boolean status);
}
