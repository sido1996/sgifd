package com.sgifdbackend.demo.appuibudgetaire.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgifdbackend.demo.appuibudgetaire.entities.AppuiBudgetaire;

@Repository
public interface AppuiBudgetaireDao extends JpaRepository<AppuiBudgetaire, Long> {
	List<AppuiBudgetaire> findByStatusAndAnnee_Id(Boolean status, Long id);
	List<AppuiBudgetaire> findByStatusAndPtfBailleurFrs_IdAndAnnee_Id(Boolean status, Long idPtf, Long id);
	List<AppuiBudgetaire> findByStatusAndPtfBailleurFrs_Id(Boolean status, Long idPtf);
	List<AppuiBudgetaire>findByStatusAndStructureBeneficiaire_IdAndAnnee_Id(boolean status, Long structure, Long idAnne);

}
