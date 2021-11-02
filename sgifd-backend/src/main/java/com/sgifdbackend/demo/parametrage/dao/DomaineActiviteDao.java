package com.sgifdbackend.demo.parametrage.dao;


import com.sgifdbackend.demo.parametrage.entites.DomaineActivite;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DomaineActiviteDao extends JpaRepository<DomaineActivite, Long> {
    List<DomaineActivite> findByStatus(Boolean status);
}
