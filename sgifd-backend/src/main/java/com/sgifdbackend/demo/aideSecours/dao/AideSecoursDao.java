package com.sgifdbackend.demo.aideSecours.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sgifdbackend.demo.aideSecours.entites.AideAlimentaire;
import com.sgifdbackend.demo.aideSecours.entites.AideSecours;
import com.sgifdbackend.demo.aideSecours.entites.BourseFormation;

public interface AideSecoursDao extends JpaRepository<AideSecours, Long> {
	
	public Optional<AideSecours> findById(Long id);
	
	public AideSecours findAideSecoursById(Long id);
	
	public BourseFormation findAideBourseFormationById(Long id);
	
	public AideAlimentaire findAideAideAlimentaireById(Long id);
	
	public AideAlimentaire findAideAlimentaireById(Long id);
	
	public BourseFormation findBourseFormationById(Long id);
	
	List<AideSecours> findByStatus(Boolean status);
	
	List<BourseFormation> findBourseFormationByStatus(Boolean status);
	
	List<AideAlimentaire> findAideAlimentaireByStatus(Boolean status);
	//List<AideAlimentaire> findAideAlimentaireByStatusIsFalseAndInformateur();
	/*@Query("FROM BourseFormation a, Informateur i WHERE a.status = false AND a.informateur = i.id AND i.sourceInformation =:id ")
	public List<BourseFormation> listBourseFormation(@Param("id") Long id);
	
	@Query("FROM AideAlimentaire a, Informateur i WHERE a.status = false AND a.informateur = i.id AND i.sourceInformation =:id ")
	public List<AideAlimentaire> listAideAlimentaire(@Param("id") Long id);
	*/
	public List<AideAlimentaire> findAideAlimentaireByStatusIsFalseAndInformateur_SourceInformation_Id(long id);
	
	public List<BourseFormation> findBourseFormationByStatusIsFalseAndInformateur_SourceInformation_Id(long id);
	
	//public List<AideAlimentaire> findAideAlimentaireByStatusIsFalseAndInformateur_IdEqualsFindInformateurByIdAndSourceInformation_Id(long id);
	
	//public List<AideAlimentaire> findAideAlimentaireByStatusIsFalseAndInformateur_IdAndInformateurByIdAndSourceInformation_Id(long id);
	
	

    @Query("select e.libelle, sum(a.montant) as montant, count(a.id) "
    		+ " from AideSecours as a, Annee as e "
    		+ " where a.exercice.id = e.id "
    		+ " and a.status = false "
    		+ " and e.status = false "
    		+ " group by e.libelle "
    		+ " order by e.libelle asc ")
    		public List<Object> statEvolutionAideByYear();
    
}
