package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.payload.ProjetDoublonRequest;
import com.sgifdbackend.demo.projet.entities.RessourceInterieureAnnuelle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.CriteriaUpdate;
import javax.persistence.metamodel.Metamodel;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface ProjetProgrammeIdeeDao extends JpaRepository<ProjetProgrammeIdee, Long> {

	Optional<ProjetProgrammeIdee> findById(Long id);
	ProjetProgrammeIdee findByStatusAndIsValideAndIsCloseAndReference(Boolean status, Boolean status1, Boolean status2, String reference);
	List<ProjetProgrammeIdee> findByStatus(Boolean status);
	List<ProjetProgrammeIdee> findByStatusAndIsValideAndIsClose(Boolean status, Boolean isValide, Boolean isClose);
	List<ProjetProgrammeIdee> findByStatusAndIsValideAndIsCloseAndAnnee_id(Boolean status, Boolean isValide, Boolean isClose, Long id);
	List<ProjetProgrammeIdee> findByStatusAndIsValideAndIsCloseAndStructureSousTutelle_idAndAnnee_id(Boolean status, Boolean isValide, Boolean isClose, Long idStructure, Long idAnnee);

	List<ProjetProgrammeIdee> findByStatusAndIsCloseAndStructureSousTutelle_idAndAnnee_id(Boolean status, Boolean isClose, Long idStructure, Long idAnnee);


	List<ProjetProgrammeIdee> findByStatusAndReference(Boolean status, String reference);

	ProjetProgrammeIdee findByStatusAndIdAndStructureSousTutelle_id(Boolean status, Long idProjet, Long idStructure);
	List<ProjetProgrammeIdee> findByStatusAndIsValideAndIsCloseAndStructureSousTutelle_id(Boolean status, Boolean isValide, Boolean isClose, Long idStructure);
	List<ProjetProgrammeIdee> findByStatusAndIsCloseAndStructureSousTutelle_id(Boolean status, Boolean isClose, Long idStructure);

	@Query(nativeQuery = true, value ="select p.id as id, p.reference as reference, "
			+ " p.libelle as libelle, p.cout_global_projet as coutGlobalProjet, p.date_demarrage as date_demarrage "
			+ " from t_projet_programme_idee p "
			+ " where p.status = false ")
	List<Object> searchDoublonWithLibelleRequest(@Param("keyWord") String keyWord);
	//List<Object> searchDoublonWithLibelleRequest(@Param("keyWord") String keyWord);
	/*@Override
	public List<ProjetProgrammeIdee> searchProjetProgrammeWithParam(String keyWord) {

		List<ProjetProgrammeIdee> projetProgrammeIdeeList =
				entityManager.createNativeQuery( "SELECT * FROM t_projet_programme_idee p " +
						" where p.status = false "+keyWord, ProjetProgrammeIdee.class ).getResultList();
	    return projetProgrammeIdeeList;
	}*/



}
