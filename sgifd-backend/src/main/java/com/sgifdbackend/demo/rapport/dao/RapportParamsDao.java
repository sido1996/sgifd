package com.sgifdbackend.demo.rapport.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sgifdbackend.demo.rapport.entities.RapportParams;

public interface RapportParamsDao extends JpaRepository<RapportParams, Long> {
	List<RapportParams> findByStatus(Boolean status);
	Optional<RapportParams> findById(Long id);
}
