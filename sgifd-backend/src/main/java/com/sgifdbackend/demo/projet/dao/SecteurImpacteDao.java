package com.sgifdbackend.demo.projet.dao;

import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.entities.SecteurImpacte;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SecteurImpacteDao extends JpaRepository<SecteurImpacte, Long> {
	Optional<SecteurImpacte> findById(Long id);
	List<SecteurImpacte> findByStatusAndProjetProgrammeIdee(Boolean status, ProjetProgrammeIdee projetProgrammeIdee);
    List<SecteurImpacte> findByStatus(Boolean status);
    
    @Query("select se.libelle, count(*) as nbre "
    		+ " from SecteurImpacte as s, Secteur se "
    		+ " where s.secteur.id = se.id "
    		+ " and s.status = false "
    		+ " and se.status = false "
    		+ " and s.projetProgrammeIdee is not null "
    		+ " group by se.libelle "
    		+ " order by se.libelle asc ")
    		public List<Object> statNombreProjetBySecteur();
}
