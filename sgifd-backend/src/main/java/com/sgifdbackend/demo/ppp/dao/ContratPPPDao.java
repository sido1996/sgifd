package com.sgifdbackend.demo.ppp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sgifdbackend.demo.ppp.entites.ContratPPP;

public interface ContratPPPDao extends JpaRepository<ContratPPP, Long> {
	List<ContratPPP> findByStatus(Boolean status);
	public ContratPPP findByIdIs(Long id);
	public ContratPPP findByStatusIsFalseAndId(Long id);

}
