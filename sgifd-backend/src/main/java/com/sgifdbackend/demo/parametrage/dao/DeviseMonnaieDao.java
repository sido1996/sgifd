package com.sgifdbackend.demo.parametrage.dao;



import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviseMonnaieDao extends JpaRepository<DeviseMonnaie, Long> {
    List<DeviseMonnaie> findByStatus(Boolean status);

}
