package com.sgifdbackend.demo.projet.dao;

import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.entities.Localisation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocalisationDao extends JpaRepository<Localisation, Long> {
	Optional<Localisation> findById(Long id);
	List<Localisation> findByStatusAndProjetProgrammeIdee(Boolean status, ProjetProgrammeIdee projetProgrammeIdee);
    List<Localisation> findByStatus(Boolean status);
}
