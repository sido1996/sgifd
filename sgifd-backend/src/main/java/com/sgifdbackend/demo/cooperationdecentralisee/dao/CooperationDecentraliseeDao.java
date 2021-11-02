package com.sgifdbackend.demo.cooperationdecentralisee.dao;


import com.sgifdbackend.demo.cooperationdecentralisee.entities.CooperationDecentralisee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CooperationDecentraliseeDao extends JpaRepository<CooperationDecentralisee, Long> {
	CooperationDecentralisee findAccordById(Long id);
	CooperationDecentralisee findByIdLike(Long id);
    List<CooperationDecentralisee> findByStatus(Boolean status);
    List<CooperationDecentralisee> findByStatusAndStructureBeneficiaire_id(Boolean status, Long idStructure);
    

    @Query("select e.libelle, sum(c.montant) as montant, count(c.id) "
    		+ " from CooperationDecentralisee as c, Annee as e "
    		+ " where c.exercice.id = e.id "
    		+ " and c.status = false "
    		+ " and e.status = false "
    		+ " group by e.libelle "
    		+ " order by e.libelle asc ")
    		public List<Object> statEvolutionCooperationByYear();
    
}
