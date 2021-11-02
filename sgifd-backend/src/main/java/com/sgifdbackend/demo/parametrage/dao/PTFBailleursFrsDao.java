package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.Pays;
import com.sgifdbackend.demo.parametrage.entites.PilierPAG;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PTFBailleursFrsDao extends JpaRepository<PTFBailleurFrs, Long> {

	Optional<PTFBailleurFrs> findById(Long id);
	
    List<PTFBailleurFrs> findByStatus(Boolean status);
    
}
