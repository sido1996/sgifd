package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.NiveauMaturite;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NiveauMaturiteDao extends JpaRepository<NiveauMaturite, Long> {
    List<NiveauMaturite> findByStatus(Boolean status);
}
