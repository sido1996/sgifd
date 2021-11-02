package com.sgifdbackend.demo.aideSecours.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sgifdbackend.demo.aideSecours.entites.Octroyer;

public interface OctroyerDao extends JpaRepository<Octroyer, Long> {
		
	List<Octroyer> findByStatus(Boolean status);
	
	

}
