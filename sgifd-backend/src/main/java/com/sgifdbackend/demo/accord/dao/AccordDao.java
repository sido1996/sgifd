package com.sgifdbackend.demo.accord.dao;


import com.sgifdbackend.demo.accord.entites.Accord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccordDao extends JpaRepository<Accord, Long> {
    Accord findAccordById(Long id);
    Accord findByIdLike(Long id);
    List<Accord> findByStatus(Boolean status);
    List<Accord> findByStatusAndAnnee_id(Boolean status, Long id);
    
    
    @Query("select e.libelle, count(a.id) as nbre"
    		+ " from Accord as a, Annee as e "
    		+ " where a.annee.id = e.id"
    		+ " and e.status = false "
    		+ " and a.status = false "
    		+ " group by e.libelle "
    		+ " order by e.libelle asc")
    		public List<Object> statAccordByYear();
    
    
    @Query("select s.libelle, count(a.id) as nbre"
    		+ " from Accord as a, StatusAccord as s "
    		+ " where a.statusAccord.id = s.id "
    		+ " and s.status = false "
    		+ " and a.status = false "
    		+ " group by s.libelle "
    		+ " order by s.libelle asc")
    		public List<Object> statAccordByStatus();
    
}
