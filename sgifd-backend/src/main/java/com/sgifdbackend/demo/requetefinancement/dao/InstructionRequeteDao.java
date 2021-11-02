package com.sgifdbackend.demo.requetefinancement.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgifdbackend.demo.requetefinancement.entities.InstructionRequete;
import com.sgifdbackend.demo.requetefinancement.entities.RequeteFinancement;

import java.util.List;

@Repository
public interface InstructionRequeteDao extends JpaRepository<InstructionRequete, Long> {

    List<InstructionRequete> findByStatus(Boolean status);
	List<InstructionRequete> findByStatusAndRequeteFinancement(Boolean status, RequeteFinancement requeteFinancement);
}
