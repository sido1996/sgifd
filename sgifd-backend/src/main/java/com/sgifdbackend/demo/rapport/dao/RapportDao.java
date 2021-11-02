package com.sgifdbackend.demo.rapport.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sgifdbackend.demo.rapport.entities.Rapport;

public interface RapportDao extends JpaRepository<Rapport, Long> {
	List<Rapport> findByStatus(Boolean status);
	Optional<Rapport> findById(Long id);
}
