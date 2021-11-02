package com.sgifdbackend.demo.projet.dao;

import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.entities.RessourceInterieureAnnuelle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RessourceInterieureAnnuelleDao extends JpaRepository<RessourceInterieureAnnuelle, Long> {
	Optional<RessourceInterieureAnnuelle> findById(Long id);
	List<RessourceInterieureAnnuelle> findByStatusAndProjetProgrammeIdee(Boolean status, ProjetProgrammeIdee projetProgrammeIdee);
    List<RessourceInterieureAnnuelle> findByStatus(Boolean status);
    

    @Query("select e.libelle, sum(re.montantRessourceProgrammer) as programmer, sum(re.montantRessourceEngager) as consommer"
    		+ " from RessourceInterieureAnnuelle as re, Annee as e "
    		+ " where re.annee.id = e.id "
    		+ " and re.status = false "
    		+ " and e.status = false "
    		+ " group by e.libelle "
    		+ " order by e.libelle asc ")
    		public List<Object> statRessourceInterieureByYear();
}
