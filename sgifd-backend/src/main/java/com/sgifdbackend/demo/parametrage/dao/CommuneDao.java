package com.sgifdbackend.demo.parametrage.dao;


import com.sgifdbackend.demo.parametrage.entites.Commune;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommuneDao extends JpaRepository<Commune, Long> {
	
    List<Commune> findByStatus(Boolean status);

    List<Commune> findByDepartement_id(Long id);
}
