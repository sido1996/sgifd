package com.sgifdbackend.demo.parametrage.dao;



import com.sgifdbackend.demo.parametrage.entites.GrandSecteur;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.parametrage.entites.Secteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecteurDao extends JpaRepository<Secteur, Long> {

    List<Secteur> findByStatus(Boolean status);
    List<Secteur> findByStatusAndGrandSecteur_id(Boolean status, Long id);
}
