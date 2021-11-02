package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.accord.dao.AccordDao;
import com.sgifdbackend.demo.aideSecours.dao.AideSecoursDao;
import com.sgifdbackend.demo.cooperationdecentralisee.dao.CooperationDecentraliseeDao;
import com.sgifdbackend.demo.parametrage.dao.ODDDao;
import com.sgifdbackend.demo.parametrage.entites.NiveauMaturite;
import com.sgifdbackend.demo.parametrage.entites.ODD;
import com.sgifdbackend.demo.projet.dao.RessourceExterieureAnnuelleDao;
import com.sgifdbackend.demo.projet.dao.RessourceInterieureAnnuelleDao;
import com.sgifdbackend.demo.projet.dao.SecteurImpacteDao;
import com.sgifdbackend.demo.requetefinancement.dao.RequeteFinancementDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/statistique")
public class StatistiqueApi {

	@Autowired
	private AccordDao accordDao;

	@Autowired
	private RequeteFinancementDao requeteFinancementDao;
	
	@Autowired
	private RessourceInterieureAnnuelleDao ressourceInterieureAnnuelleDao;
	
	@Autowired
	private RessourceExterieureAnnuelleDao ressourceExterieureAnnuelleDao;
	
	@Autowired
	private SecteurImpacteDao secteurImpacteDao;
	
	@Autowired
	private AideSecoursDao aideSecoursDao;
	
	@Autowired
	private CooperationDecentraliseeDao cooperationDecentraliseeDao;
	

	@GetMapping(value = "/accord/stat-by-year")
	public List<Object> getStatsAccordYear() {
		return accordDao.statAccordByYear();
	}


	@GetMapping(value = "/accord/stat-by-status-accord")
	public List<Object> getStatsAccordStatusAccord() {
		return accordDao.statAccordByStatus();
	}
	

	@GetMapping(value = "/requete-financement/stat-by-year")
	public List<Object> getStatsRequeteYear() {
		return requeteFinancementDao.statRequeteByYear();
	}

	@GetMapping(value = "/requete-financement/stat-by-nature-financement")
	public List<Object> getStatsRequeteNatureFinancement() {
		return requeteFinancementDao.statNatureFinancementByYear();
	}

	
	
	@GetMapping(value = "/projet/stat-by-year-ressource-interieure")
	public List<Object> getStatsProjetRessourceInterieureByYear() {
		return ressourceInterieureAnnuelleDao.statRessourceInterieureByYear();
	}

	@GetMapping(value = "/projet/stat-by-year-ressource-exterieure")
	public List<Object> getStatsProjetRessourceExterieureByYear() {
		return ressourceExterieureAnnuelleDao.statRessourceExterieureByYear();
	}

	@GetMapping(value = "/projet/stat-projet-by-secteur")
	public List<Object> getStatsProjetBySecteur() {
		return secteurImpacteDao.statNombreProjetBySecteur();
	}
	
	
	

	@GetMapping(value = "/aide-secours/stat-evolution")
	public List<Object> getStatsEvolutionAideSecours() {
		return aideSecoursDao.statEvolutionAideByYear();
	}
	
	

	@GetMapping(value = "/cooperation-decentralisee/stat-evolution")
	public List<Object> getStatsEvolutionCooperation() {
		return cooperationDecentraliseeDao.statEvolutionCooperationByYear();
	}
}
