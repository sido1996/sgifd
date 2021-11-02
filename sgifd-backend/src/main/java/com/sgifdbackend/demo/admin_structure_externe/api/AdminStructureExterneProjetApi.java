package com.sgifdbackend.demo.admin_structure_externe.api;

import java.util.ArrayList;
import java.util.List;

import com.sgifdbackend.demo.enums.RoleName;
import com.sgifdbackend.demo.security.entities.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sgifdbackend.demo.accord.dao.AccordDao;
import com.sgifdbackend.demo.accord.entites.Accord;
import com.sgifdbackend.demo.aideSecours.dao.AideSecoursDao;
import com.sgifdbackend.demo.cooperationdecentralisee.dao.CooperationDecentraliseeDao;
import com.sgifdbackend.demo.parametrage.dao.ProjetProgrammeIdeeDao;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.dao.ConditionSuspensiveAccordDao;
import com.sgifdbackend.demo.projet.dao.ConditionSuspensiveDecaissementDao;
import com.sgifdbackend.demo.projet.dao.LocalisationDao;
import com.sgifdbackend.demo.projet.dao.ProrogationProjetDao;
import com.sgifdbackend.demo.projet.dao.RessourceExterieureDao;
import com.sgifdbackend.demo.projet.dao.SecteurImpacteDao;
import com.sgifdbackend.demo.projet.entities.ConditionSuspensiveAccord;
import com.sgifdbackend.demo.projet.entities.ConditionSuspensiveDecaissement;
import com.sgifdbackend.demo.projet.entities.Localisation;
import com.sgifdbackend.demo.projet.entities.ProrogationProjet;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.projet.entities.SecteurImpacte;
import com.sgifdbackend.demo.security.CurrentUser;
import com.sgifdbackend.demo.security.UserPrincipal;
import com.sgifdbackend.demo.security.dao.UserRepository;
import com.sgifdbackend.demo.security.entities.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@RestController
@CrossOrigin("*")
@RequestMapping("/projet-programme-idee/structure")
public class AdminStructureExterneProjetApi {


	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private ProjetProgrammeIdeeDao projetProgrammeIdeeDao;

	@Autowired
	private ConditionSuspensiveDecaissementDao conditionSuspensiveDecaissementDao;

	@Autowired
	private ConditionSuspensiveAccordDao conditionSuspensiveAccordDao;

	@Autowired
	private RessourceExterieureDao ressourceExterieureDao;

	@Autowired
	private LocalisationDao localisationDao;

	@Autowired
	private ProrogationProjetDao prorogationProjetDao;

	@Autowired
	private AideSecoursDao aideSecoursDao;
	
	@Autowired
    UserRepository userRepository;
	
	@Autowired
	private AccordDao accordDao;

	@Autowired
	private SecteurImpacteDao secteurImpacteDao;
	
	// Début projet

	@GetMapping(value = "/list-en-cours-by-structure-by-annee/{idAnnee}")
	public List<ProjetProgrammeIdee> getProjetEnCoursParAnneeParStructure(@CurrentUser UserPrincipal currentUser , @PathVariable("idAnnee") Long idAnnee) {
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		return projetProgrammeIdeeDao.findByStatusAndIsValideAndIsCloseAndStructureSousTutelle_idAndAnnee_id(false,true, false, meUser.get().getStructureBeneficiaire().getId(), idAnnee);
	}
	
	/*@GetMapping(value = "/list-en-cours/{id}")
	public List<ProjetProgrammeIdee> getProjetEnCours(@PathVariable("id") Long id) {
		
		return projetProgrammeIdeeDao.findByStatusAndIsValideAndIsCloseAndStructureSousTutelle_idAndAnnee_id(false, true, false, id, id);
	}*/

	@GetMapping(value = "/list-cloturer/{id}")
	public List<ProjetProgrammeIdee> getProjetCloturer(@CurrentUser UserPrincipal currentUser, @PathVariable("id") Long id) {
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		return projetProgrammeIdeeDao.findByStatusAndIsValideAndIsCloseAndStructureSousTutelle_idAndAnnee_id(false, true, true, meUser.get().getStructureBeneficiaire().getId(), id);
	}

	@GetMapping(value = "/doublon-reference/{reference}")
	public List<ProjetProgrammeIdee> getProjetDoublonByReference(@PathVariable("reference") String reference) {
		
		return projetProgrammeIdeeDao.findByStatusAndReference(false, reference);
	}
	
	@GetMapping(value = "/list")
	public List<ProjetProgrammeIdee> getProjetProgrammeIdees(@CurrentUser UserPrincipal currentUser, @PathVariable("id") Long id) {
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		return projetProgrammeIdeeDao.findByStatusAndIsValideAndIsCloseAndStructureSousTutelle_id(false, true, false, meUser.get().getStructureBeneficiaire().getId());
	}


	@GetMapping(value = "/list-globale")
	public List<ProjetProgrammeIdee> getProjetProgrammeIdeesGlobal(@CurrentUser UserPrincipal currentUser) {
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		return projetProgrammeIdeeDao.findByStatusAndIsValideAndIsCloseAndStructureSousTutelle_id(false,true, false, meUser.get().getStructureBeneficiaire().getId());
		
	}

	@PostMapping(value = "/save")
	public ProjetProgrammeIdee save(@RequestBody ProjetProgrammeIdee projetProgrammeIdee, @CurrentUser UserPrincipal currentUser) {

		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		
		if(meUser.get().getStructureBeneficiaire() != null) {
		projetProgrammeIdee.setStructureSousTutelle(meUser.get().getStructureBeneficiaire());
		}
		projetProgrammeIdee.setValide(true);
		System.out.println("projet  ===>"+projetProgrammeIdee.toString());
		ProjetProgrammeIdee projet = projetProgrammeIdeeDao.saveAndFlush(projetProgrammeIdee);
		//List<ConditionSuspensiveAccord> conditionAccords = projet.getConditionSuspensiveAccords();
		List<ConditionSuspensiveAccord> conditionAccords = projetProgrammeIdee.getConditionSuspensiveAccords();
		//List<ConditionSuspensiveDecaissement> conditionDecaissements = projet.getConditionSuspensiveDecaissements();
		List<ConditionSuspensiveDecaissement> conditionDecaissements = projetProgrammeIdee.getConditionSuspensiveDecaissements();
		//List<RessourceExterieure> ressources = projet.getRessourceExterieures();
		List<RessourceExterieure> ressources = projetProgrammeIdee.getRessourceExterieures();
		//List<Localisation> localisations = projet.getLocalisations();
		List<Localisation> localisations = projetProgrammeIdee.getLocalisations();
		//List<ProrogationProjet> prorogationProjets = projet.getProrogationProjets();
		List<ProrogationProjet> prorogationProjets = projetProgrammeIdee.getProrogationProjets();	   
		   
		   List<SecteurImpacte> secteurImpactes = projetProgrammeIdee.getSecteurImpactes();	
		   
		   
		   for(int i=0; i< conditionAccords.size(); i++) {
			   conditionAccords.get(i).setProjetProgrammeIdee(projet);
			   conditionSuspensiveAccordDao.saveAndFlush(conditionAccords.get(i));
		   }
		   for(int i=0; i< conditionDecaissements.size(); i++) {
			   conditionDecaissements.get(i).setProjetProgrammeIdee(projet);
			   conditionSuspensiveDecaissementDao.saveAndFlush(conditionDecaissements.get(i));
		   }
		   for(int i=0; i< ressources.size(); i++) {
			   if(ressources.get(i).getNatureFinancement() != null) {
				   ressources.get(i).setProjetProgrammeIdee(projet);
				   //ressources.get(i).setIsStatusClose(true);
				   ressourceExterieureDao.saveAndFlush(ressources.get(i));
			   }
		   }
		   for(int i=0; i< localisations.size(); i++) {
			   localisations.get(i).setProjetProgrammeIdee(projet);
			   localisationDao.saveAndFlush(localisations.get(i));
		   }

		   for(int i=0; i< prorogationProjets.size(); i++) {
			   prorogationProjets.get(i).setProjetProgrammeIdee(projet);
			   prorogationProjetDao.saveAndFlush(prorogationProjets.get(i));
		   }

		   for(int i=0; i< secteurImpactes.size(); i++) {
			   secteurImpactes.get(i).setProjetProgrammeIdee(projet);
			   secteurImpacteDao.saveAndFlush(secteurImpactes.get(i));
		   }
		   
			return projet;

	}

	@PostMapping(value = "/delete")
	public ProjetProgrammeIdee delete(@RequestBody ProjetProgrammeIdee ProjetProgrammeIdee) {

		ProjetProgrammeIdee.setStatus(true);
		return	projetProgrammeIdeeDao.saveAndFlush(ProjetProgrammeIdee);
	}

	@RequestMapping(value="/cloturer/{id}", method = RequestMethod.GET)
	public ProjetProgrammeIdee cloturer(@PathVariable("id") Long id) {
		ProjetProgrammeIdee unprojet = projetProgrammeIdeeDao.findById(id).get();
		unprojet.setClose(true);

		return	projetProgrammeIdeeDao.saveAndFlush(unprojet);
	}
	
	
	@RequestMapping(value="/liste-accords/{id}", method = RequestMethod.GET)
	public List<Accord> getAccordsForProjet(@PathVariable("id") Long id) {
        ProjetProgrammeIdee unprojet = projetProgrammeIdeeDao.findById(id).get();
        
		return	unprojet.getAccord();
	}
	
	@RequestMapping(value="/joindre-accord/{idProjet}/{idAccord}", method = RequestMethod.GET)
	public ProjetProgrammeIdee joindreAccord(@PathVariable("idProjet") Long idProjet, @PathVariable("idAccord") Long idAccord) {
		
		Accord accord = accordDao.findById(idAccord).get();
        ProjetProgrammeIdee unprojet = projetProgrammeIdeeDao.findById(idProjet).get();
        unprojet.addAccord(accord);
        
		return	projetProgrammeIdeeDao.saveAndFlush(unprojet);
	}

	
	@RequestMapping(value="/enlever-accord/{idProjet}/{idAccord}", method = RequestMethod.GET)
	public ProjetProgrammeIdee enleverAccord(@PathVariable("idProjet") Long idProjet, @PathVariable("idAccord") Long idAccord) {
		
		Accord accord = accordDao.findById(idAccord).get();
        ProjetProgrammeIdee unprojet = projetProgrammeIdeeDao.findById(idProjet).get();
        unprojet.getAccord().remove(accord);
        
		return	projetProgrammeIdeeDao.saveAndFlush(unprojet);
	}
	


	@RequestMapping(value="/relancer/{id}", method = RequestMethod.GET)
	public ProjetProgrammeIdee relancer(@PathVariable("id") Long id) {
		ProjetProgrammeIdee unprojet = projetProgrammeIdeeDao.findById(id).get();
		unprojet.setClose(false);

		return	projetProgrammeIdeeDao.saveAndFlush(unprojet);
	}

	@RequestMapping(value="/detail/{id}", method = RequestMethod.GET)
	public ProjetProgrammeIdee getByIdAndIdStructure(@PathVariable("id") Long id, @CurrentUser UserPrincipal currentUser) {
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		
		return	projetProgrammeIdeeDao.findByStatusAndIdAndStructureSousTutelle_id(false, id, meUser.get().getStructureBeneficiaire().getId());
	}
	
	@PostMapping(value = "/save-file/{id}")
	public ProjetProgrammeIdee saveFile(@PathVariable("id") Long id, @RequestBody DBFile dBFile) {
		ProjetProgrammeIdee projetProgrammeIdee = projetProgrammeIdeeDao.findById(id).get();
		projetProgrammeIdee.getFiles().add(dBFile);
		dBFile.setProjetProgrammeIdee(projetProgrammeIdee);

		return	projetProgrammeIdeeDao.saveAndFlush(projetProgrammeIdee);
	}	
	
	// Fin projet	


	@RequestMapping(value="/rechercher-doublon", method = RequestMethod.POST)
	public List<ProjetProgrammeIdee> relancer(@RequestBody String keyWord, @CurrentUser UserPrincipal currentUser) {
		System.out.println(keyWord+"  taille  ===>");
		List<ProjetProgrammeIdee> projetProgrammeIdeeList = new ArrayList<>();
		if (userRepository.findById(currentUser.getId()).isPresent()) {
			User userAuthority = userRepository.findById(currentUser.getId()).get();
			boolean repAdmin = false;
			boolean repStructure = false;
			for (Role role : userAuthority.getRoles()) {
				if (role.getName() == RoleName.ROLE_ADMIN || role.getName() == RoleName.ROLE_USER_PTF) {
					repAdmin = true;
				} else {
					if (role.getName() == RoleName.ROLE_USER_STRUCTURE_EXTERNE) {
						repStructure = true;
					}
				}
			}
			if (repAdmin == true) {
				projetProgrammeIdeeList =
						entityManager.createNativeQuery("SELECT * FROM t_projet_programme_idee p " +
								" where p.status = false " + keyWord, ProjetProgrammeIdee.class).getResultList();
			}
			if (repStructure == true && userAuthority.getStructureBeneficiaire() != null) {
				projetProgrammeIdeeList =
						entityManager.createNativeQuery("SELECT * FROM t_projet_programme_idee p " +
								" where p.status = false AND p.structure_sous_tutelle_id = "+userAuthority.getStructureBeneficiaire().getId()+
								" "+ keyWord, ProjetProgrammeIdee.class).getResultList();
			}
		}
		return	projetProgrammeIdeeList;
	}

}
