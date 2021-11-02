package com.sgifdbackend.demo.requetefinancement.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.requetefinancement.entities.RelanceRequeteFinancement;

import java.util.List;

@Repository
public interface RelanceRequeteFinancementDao extends JpaRepository<RelanceRequeteFinancement, Long> {

    List<RelanceRequeteFinancement> findByStatus(Boolean status);
    List<RelanceRequeteFinancement> findByStatusAndRessourceExterieure(Boolean status, RessourceExterieure ressourceExterieure);
}
