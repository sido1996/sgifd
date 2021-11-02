package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.accord.dao.AccordDao;
import com.sgifdbackend.demo.accord.entites.Accord;
import com.sgifdbackend.demo.entitiesBase.CloseProjet;
import com.sgifdbackend.demo.enums.RoleName;
import com.sgifdbackend.demo.parametrage.dao.ProjetProgrammeIdeeDao;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.payload.ProjetDoublonRequest;
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
import com.sgifdbackend.demo.security.entities.Role;
import com.sgifdbackend.demo.security.entities.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/projet-programme-idee")
public class ProjetProgrammeIdeeApi {

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
    UserRepository userRepository;

	@Autowired
	private ProrogationProjetDao prorogationProjetDao;

	@Autowired
	private AccordDao accordDao;


	@Autowired
	private SecteurImpacteDao secteurImpacteDao;

//retouche ramich
	@GetMapping(value = "/list-en-cours-by-structure-by-annee/{idAnnee}/{idStructure}")
	public List<ProjetProgrammeIdee> getProjetEnCoursParAnneeParStructure( @PathVariable("idStructure") Long idStructure, @PathVariable("idAnnee") Long idAnnee) {
		
		System.out.println("structure ===>"+idStructure);
		//retouche ramich (true remplacé par false
		return projetProgrammeIdeeDao.findByStatusAndIsCloseAndStructureSousTutelle_idAndAnnee_id(false, false, idStructure, idAnnee);
	}

	@GetMapping(value = "/list-en-cours/{id}")
	public List<ProjetProgrammeIdee> getProjetEnCours(@PathVariable("id") Long id) {
		
		return projetProgrammeIdeeDao.findByStatusAndIsValideAndIsCloseAndAnnee_id(false, true, false, id);
	}
	

	@GetMapping(value = "/doublon-reference/{reference}")
	public List<ProjetProgrammeIdee> getProjetDoublonByReference(@PathVariable("reference") String reference) {
		
		return projetProgrammeIdeeDao.findByStatusAndReference(false, reference);
	}

	@GetMapping(value = "/list-cloturer/{id}")
	public List<ProjetProgrammeIdee> getProjetCloturer(@PathVariable("id") Long id) {
		
		return projetProgrammeIdeeDao.findByStatusAndIsValideAndIsCloseAndAnnee_id(false, true, true, id);
	}

	@GetMapping(value = "/list")
	public List<ProjetProgrammeIdee> getProjetProgrammeIdees() {
		
		return projetProgrammeIdeeDao.findByStatusAndIsValideAndIsClose(false, false, false);
	}

	@GetMapping(value = "/list-globale")
	public List<ProjetProgrammeIdee> getProjetProgrammeIdeesGlobal() {
		
		return projetProgrammeIdeeDao.findByStatus(false);
	}
	
	@GetMapping(value = "/list-projet-elus-by-structure/{idStructure}")
	public List<ProjetProgrammeIdee> getProjetSoumis( @CurrentUser UserPrincipal currentUser) {
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		return projetProgrammeIdeeDao.findByStatusAndIsCloseAndStructureSousTutelle_id(false, false, meUser.get().getStructureBeneficiaire().getId());
	}
	
	
	@PostMapping(value = "/save")
	public ProjetProgrammeIdee save(@RequestBody ProjetProgrammeIdee projetProgrammeIdee) {
	
	   System.out.println("projet  ===>"+projetProgrammeIdee.toString());
	   projetProgrammeIdee.setValide(true);
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
			   ressources.get(i).setIsStatusClose(true);
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

	@PostMapping(value="/cloturer")
	public ProjetProgrammeIdee cloturer(@RequestBody CloseProjet closeProjet) {
        ProjetProgrammeIdee unprojet = projetProgrammeIdeeDao.findById(closeProjet.getId()).get();
        if(unprojet != null) {
        	 unprojet.setReasonClose(closeProjet.getReasonClose());
        	 unprojet.setDateClose(closeProjet.getDateClose());
        	 unprojet.setClose(true);
        }
       
		return	projetProgrammeIdeeDao.saveAndFlush(unprojet);
	}


	@RequestMapping(value="/relancer/{id}", method = RequestMethod.GET)
	public ProjetProgrammeIdee relancer(@PathVariable("id") Long id) {
        ProjetProgrammeIdee unprojet = projetProgrammeIdeeDao.findById(id).get();
        unprojet.setClose(false);
        
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
	
	@RequestMapping(value="/detail/{id}", method = RequestMethod.GET)
	public ProjetProgrammeIdee getById(@PathVariable("id") Long id,
									   @CurrentUser UserPrincipal currentUser) {
		ProjetProgrammeIdee projetProgrammeIdee = null;
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
				projetProgrammeIdee = projetProgrammeIdeeDao.findById(id).get();
			}
			if (repStructure == true && userAuthority.getStructureBeneficiaire() != null) {
				projetProgrammeIdee = projetProgrammeIdeeDao.findByStatusAndIdAndStructureSousTutelle_id(false, id, userAuthority.getStructureBeneficiaire().getId());
			}
		}
		return projetProgrammeIdee;
	}
	
	@PostMapping(value = "/save-file/{id}")
	public ProjetProgrammeIdee saveFile(@PathVariable("id") Long id, @RequestBody DBFile dBFile) {
		ProjetProgrammeIdee projetProgrammeIdee = projetProgrammeIdeeDao.findById(id).get();
		projetProgrammeIdee.getFiles().add(dBFile);
		dBFile.setProjetProgrammeIdee(projetProgrammeIdee);

		return	projetProgrammeIdeeDao.saveAndFlush(projetProgrammeIdee);
	}

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
