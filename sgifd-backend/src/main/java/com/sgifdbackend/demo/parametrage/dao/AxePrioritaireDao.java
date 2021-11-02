package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.AxePrioritaire;
import com.sgifdbackend.demo.parametrage.entites.PilierPAG;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository

public interface AxePrioritaireDao extends JpaRepository<AxePrioritaire, Long> {
//    public Agent findById(Long id);
	
	  List<AxePrioritaire> findByStatusAndPilierPAG(Boolean status, PilierPAG pilierPAG);

    List<AxePrioritaire> findByStatus(Boolean status);
}
