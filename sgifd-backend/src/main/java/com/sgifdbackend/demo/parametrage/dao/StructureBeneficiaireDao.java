package com.sgifdbackend.demo.parametrage.dao;



import com.sgifdbackend.demo.parametrage.entites.SousSecteur;
import com.sgifdbackend.demo.parametrage.entites.StructureBeneficiaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StructureBeneficiaireDao extends JpaRepository<StructureBeneficiaire, Long> {
    List<StructureBeneficiaire> findByStatus(Boolean status);
   }
