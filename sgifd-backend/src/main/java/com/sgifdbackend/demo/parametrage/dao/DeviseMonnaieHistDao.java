package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaieHist;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviseMonnaieHistDao extends JpaRepository<DeviseMonnaieHist, Long> {
    List<DeviseMonnaieHist> findByStatus(Boolean status);
}
