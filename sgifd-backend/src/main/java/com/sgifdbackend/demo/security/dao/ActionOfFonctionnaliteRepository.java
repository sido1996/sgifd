package com.sgifdbackend.demo.security.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgifdbackend.demo.security.entities.ActionOfFonctionnalite;

import java.util.List;
import java.util.Optional;

@Repository
public interface ActionOfFonctionnaliteRepository extends JpaRepository<ActionOfFonctionnalite, Long> {

	Optional<ActionOfFonctionnalite> findById(Long id);
    
    List<ActionOfFonctionnalite> findByStatus(boolean status);

}
