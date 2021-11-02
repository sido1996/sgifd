package com.sgifdbackend.demo.projet.dao;

import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.entities.ProrogationProjet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProrogationProjetDao extends JpaRepository<ProrogationProjet, Long> {
	Optional<ProrogationProjet> findById(Long id);
	List<ProrogationProjet> findByStatusAndProjetProgrammeIdee(Boolean status, ProjetProgrammeIdee projetProgrammeIdee);
    List<ProrogationProjet> findByStatus(Boolean status);
}
