package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.Cible;
import com.sgifdbackend.demo.parametrage.entites.ODD;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository

public interface CibleDao extends JpaRepository<Cible, Long> {
//    public Agent findById(Long id);
	
    List<Cible> findByStatusAndOdd(Boolean status, ODD odd);


    List<Cible> findByStatus(Boolean status);
}
