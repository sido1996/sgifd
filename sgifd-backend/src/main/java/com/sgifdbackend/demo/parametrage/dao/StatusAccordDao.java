package com.sgifdbackend.demo.parametrage.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sgifdbackend.demo.parametrage.entites.StatusAccord;

public interface StatusAccordDao extends JpaRepository<StatusAccord, Long> {
	List<StatusAccord> findByStatus(Boolean status);

}
