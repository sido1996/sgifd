package com.sgifdbackend.demo.requetefinancement.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.sgifdbackend.demo.requetefinancement.entities.RequeteFinancement;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequeteFinancementDao extends JpaRepository<RequeteFinancement, Long> {

	Optional<RequeteFinancement> findById(Long id);
	  
    List<RequeteFinancement> findByStatusAndIsStatusClose(Boolean status, Boolean isStatusClose);
    
    //RequeteFinancement findByProjetProgrammeIdee_idAndStatusAndIsStatusClose(Long idP, Boolean status, Boolean isStatusClose);

    RequeteFinancement findByProjetProgrammeIdee_id(Long idP);
    
    
    
    @Query("select e.libelle, count(r.id) as nbre"
    		+ " from RequeteFinancement as r, ProjetProgrammeIdee as p, Annee as e "
    		+ " where r.projetProgrammeIdee.id = p.id "
    		+ " and p.annee.id = e.id "
    		+ " and e.status = false "
    		+ " and r.status = false "
    		+ " and p.status = false "
    		+ " and r.isStatusClose = true "
    		+ " group by e.libelle "
    		+ " order by e.libelle asc ")
    		public List<Object> statRequeteByYear();
    
    

    @Query("select n.libelle, sum(re.montantRessourceProgrammer) as nbre"
    		+ " from RequeteFinancement as r, ProjetProgrammeIdee as p, NatureFinancement as n, RessourceExterieure re "
    		+ " where r.projetProgrammeIdee.id = p.id "
    		+ " and re.projetProgrammeIdee.id = p.id "
    		+ " and re.natureFinancement.id = n.id "
    		+ " and re.status = false "
    		+ " and r.status = false "
    		+ " and n.status = false "
    		+ " and p.status = false "
    		+ " and r.isStatusClose = true "
    		+ " group by n.libelle "
    		+ " order by n.libelle asc ")
    		public List<Object> statNatureFinancementByYear();
    
}
