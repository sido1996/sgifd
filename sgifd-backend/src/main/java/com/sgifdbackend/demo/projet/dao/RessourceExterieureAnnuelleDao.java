package com.sgifdbackend.demo.projet.dao;

import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.projet.entities.RessourceExterieureAnnuelle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RessourceExterieureAnnuelleDao extends JpaRepository<RessourceExterieureAnnuelle, Long> {
	Optional<RessourceExterieureAnnuelle> findById(Long id);
	List<RessourceExterieureAnnuelle> findByStatusAndRessourceExterieure(Boolean status, RessourceExterieure ressourceExterieure);
    List<RessourceExterieureAnnuelle> findByStatus(Boolean status);
    
    @Query("select e.libelle, sum(re.montantRessourceDecaisserFcfa) as deciasser, sum(re.montantConsommeFcfa) as consommer"
    		+ " from RessourceExterieureAnnuelle as re, Annee as e "
    		+ " where re.annee.id = e.id "
    		+ " and re.status = false "
    		+ " and e.status = false "
    		+ " group by e.libelle "
    		+ " order by e.libelle asc ")
    		public List<Object> statRessourceExterieureByYear();
    
    
}
