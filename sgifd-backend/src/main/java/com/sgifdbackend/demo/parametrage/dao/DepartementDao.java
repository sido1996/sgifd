package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.Departement;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartementDao extends JpaRepository<Departement, Long> {

    List<Departement> findByStatus(Boolean status);

    
}
