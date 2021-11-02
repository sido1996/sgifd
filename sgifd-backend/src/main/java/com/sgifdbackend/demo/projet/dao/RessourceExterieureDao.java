package com.sgifdbackend.demo.projet.dao;

import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.payload.ProjetFinance;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RessourceExterieureDao extends JpaRepository<RessourceExterieure, Long> {
	//utilisés
	
	
	Optional<RessourceExterieure> findById(Long id);
	List<RessourceExterieure> findByStatusAndProjetProgrammeIdee(Boolean status, ProjetProgrammeIdee projetProgrammeIdee);
    List<RessourceExterieure> findByStatus(Boolean status);
    List<RessourceExterieure> findByPtfBailleurFrs_IdAndIsStatusCloseAndRequeteFinancement_IdIsNotNull(Long id, Boolean status);
    
    
    @Query("select distinct r.montantRessourceDevise, r.montantRessourceProgrammer, r.deviseMonnaie, r.natureFinancement,"
    		+ " p.id, p.reference, p.libelle"
    		+ " from RessourceExterieure as r, RessourceExterieureAnnuelle as ra, ProjetProgrammeIdee as p"
    		+ " where r.projetProgrammeIdee.id = p.id"
    		+ " and ra.ressourceExterieure.id = r.id"
    		+ " and ra.montantRessourceDecaisser > 0"
    		+ " and r.ptfBailleurFrs.id =:id "
    		+ "and ra.annee.id =:annee")
    		public List<Object> listProjetsFinancesAnnuel(@Param("id") Long id, @Param("annee") Long annee);
    
    
    /*@Query("select distinct r.montantRessourceDevise, r.montantRessourceProgrammer, r.deviseMonnaie, r.natureFinancement,"
    		+ " p.id, p.reference, p.libelle"
    		+ " from RessourceExterieure as r, ProjetProgrammeIdee as p"
    		+ " where r.projetProgrammeIdee.id = p.id"
    		+ " and ra.ressourceExterieure.id = r.id"
    		+ " and ra.montantRessourceDecaisser > 0"
    		+ " and r.ptfBailleurFrs.id =:id ")
    		public List<Object> listProjetsFinances(@Param("id") Long id);*/
    
    
    @Query("select distinct p.id, p.reference, p.libelle"
    		+ " from RessourceExterieure as r, ProjetProgrammeIdee as p"
    		+ " where r.projetProgrammeIdee.id = p.id"
    		+ " and r.ptfBailleurFrs.id =:id "
    		+ " and r.status = false "
    		+ " and p.status = false "
    		+ " and r.isStatusClose = true ")
    		public List<Object> listProjetsFinances(@Param("id") Long id);
    
    
    
    @Query("select ra.montantRessourceProgrammer, ra.montantRessourceDecaisser, r.deviseMonnaie, r.natureFinancement,"
    		+ " p.reference, p.libelle, p.id"
    		+ " from RessourceExterieure as r, RessourceExterieureAnnuelle as ra, ProjetProgrammeIdee as p"
    		+ " where r.projetProgrammeIdee.id = p.id"
    		+ " and ra.ressourceExterieure.id = r.id"
    		+ " and ra.montantRessourceDecaisser > 0"
    		+ " and r.ptfBailleurFrs.id =:id "
    		+ "and ra.annee.id =:annee")
    		public List<Object> listFinancementAnnuelProjet(@Param("id") Long id, @Param("annee") Long annee);
    
    
    
    @Query("select ra.montantRessourceProgrammer, ra.montantRessourceDecaisserFcfa as montantRessourceDecaisser, r.deviseMonnaie, r.natureFinancement,"
    		+ " p.reference, p.libelle"
    		+ " from RessourceExterieure as r, RessourceExterieureAnnuelle as ra, ProjetProgrammeIdee as p"
    		+ " where r.projetProgrammeIdee.id = p.id"
    		+ " and ra.ressourceExterieure.id = r.id"
    		+ " and ra.montantRessourceDecaisser > 0"
    		+ " and r.ptfBailleurFrs.id =:id ")
    		public List<Object> listFinancementProjet(@Param("id") Long id);
    
    
    @Query("select distinct p.id, p.reference, p.libelle"
    		+ " from RessourceExterieure as r, RessourceExterieureAnnuelle as ra, ProjetProgrammeIdee as p"
    		+ " where r.projetProgrammeIdee.id = p.id"
    		+ " and ra.ressourceExterieure.id = r.id"
    		+ " and ra.montantRessourceDecaisser > 0"
    		+ " and r.ptfBailleurFrs.id =:id ")
    		public List<Object> nombreProjetsFinances(@Param("id") Long id);
    
    
  //Non utilisés
    
    @Query("from RessourceExterieure c where c.ptfBailleurFrs.id =:id and"
    + " (c.projetProgrammeIdee.id in (SELECT projetProgrammeIdee.id FROM RequeteFinancement r where r.isStatusClose=false))")
	public List<RessourceExterieure> listRessourceExterieureEncours(@Param("id") Long id);
    
    
    /*@Query("select e.id, e.montantRessourceDevise, e.montantRessourceProgrammer, e.deviseMonnaie, e.natureAssistance, e.natureFinancement,"
    		+ " po.id, po.libelle, po.objectifgeneral, po.objectifs, po.annee"
    		+ " from RessourceExterieure as e, ProjetProgrammeIdee as po"
    		+ " where e.projetProgrammeIdee.id=po.id"
    		+ " and e.ptfBailleurFrs.id =:id "
    	    + "and (e.projetProgrammeIdee.id in (SELECT projetProgrammeIdee.id FROM RequeteFinancement r where r.isStatusClose=false))")
    		public List<RequetePtf> listRequetesEncours(@Param("id")Long id);*/
   
    
    @Query("select e.id, e.montantRessourceDevise, e.montantRessourceProgrammer, e.deviseMonnaie, e.natureAssistance, e.natureFinancement,"
    		+ " po.id, po.libelle, po.objectifgeneral, po.objectifs, po.annee"
    		+ " from RessourceExterieure as e, ProjetProgrammeIdee as po"
    		+ " where e.projetProgrammeIdee.id=po.id"
    		+ " and e.ptfBailleurFrs.id =:id "
    	    + "and (e.projetProgrammeIdee.id in (SELECT projetProgrammeIdee.id FROM RequeteFinancement r where r.isStatusClose=false))")
    		public List<Object> listRequetesEncours(@Param("id") Long id);
 
    
    
    @Query("select e.id, e.montantRessourceDevise, e.montantRessourceProgrammer, e.deviseMonnaie, e.natureAssistance, e.natureFinancement,"
    		+ " po.id, po.libelle, po.objectifgeneral, po.objectifs, po.annee"
    		+ " from RessourceExterieure as e, ProjetProgrammeIdee as po"
    		+ " where e.projetProgrammeIdee.id=po.id"
    		+ " and e.ptfBailleurFrs.id =:id "
    	    + "and (e.projetProgrammeIdee.id in (SELECT projetProgrammeIdee.id FROM RequeteFinancement r where r.isStatusClose=true))")
    		public List<Object> listRequetesClotures(@Param("id") Long id);
    
     
    @Query("select c from RessourceExterieure c where c.ptfBailleurFrs.id like :x and"
    		+ " c.projetProgrammeIdee.id in (SELECT projetProgrammeIdee.id FROM RequeteFinancement r where r.isStatusClose=true)")
	public List<RessourceExterieure> listRessourceExterieureClotures(@Param("x") Long id);
    
    @Query("SELECT projetProgrammeIdee FROM RequeteFinancement r where r.isStatusClose=true")
	public List<ProjetProgrammeIdee> listProjetFinances();
    
   /* @Query("SELECT projetProgrammeIdee FROM RessourceExterieure r where r.ptfBailleurFrs.id like :x"
    		+ "and r.projetProgrammeIdee.id in (SELECT projetProgrammeIdee.id FROM RequeteFinancement r where r.isStatusClose=true)")
	public List<ProjetProgrammeIdee> listProjetFinances(@Param("x")Long id);*/
    
}
