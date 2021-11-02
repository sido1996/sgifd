package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.Secteur;
import com.sgifdbackend.demo.parametrage.entites.SousSecteur;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SousSecteurDao extends JpaRepository<SousSecteur, Long> {
    List<SousSecteur> findByStatus(Boolean status);
    List<SousSecteur> findByStatusAndSecteur_id(Boolean status, Long id);
}
