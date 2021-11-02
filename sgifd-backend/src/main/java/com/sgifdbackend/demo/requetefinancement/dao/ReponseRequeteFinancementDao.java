package com.sgifdbackend.demo.requetefinancement.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.requetefinancement.entities.ReponseRequeteFinancement;

import java.util.List;

@Repository
public interface ReponseRequeteFinancementDao extends JpaRepository<ReponseRequeteFinancement, Long> {

    List<ReponseRequeteFinancement> findByStatus(Boolean status);
	 List<ReponseRequeteFinancement> findByStatusAndRessourceExterieure(Boolean status, RessourceExterieure ressourceExterieure);
}
