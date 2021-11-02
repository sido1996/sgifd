package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.ODD;
import com.sgifdbackend.demo.parametrage.entites.Pays;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaysDao extends JpaRepository<Pays, Long> {
    Pays findById(String id);
    Pays findByIdLike(String id);
    List<Pays> findByStatus(Boolean status);
}
