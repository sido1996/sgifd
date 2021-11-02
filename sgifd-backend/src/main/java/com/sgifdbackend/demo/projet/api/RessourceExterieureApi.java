package com.sgifdbackend.demo.projet.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.parametrage.dao.ProjetProgrammeIdeeDao;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.dao.RessourceExterieureAnnuelleDao;
import com.sgifdbackend.demo.projet.dao.RessourceExterieureDao;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.projet.entities.RessourceExterieureAnnuelle;
import com.sgifdbackend.demo.requetefinancement.dao.RequeteFinancementDao;
import com.sgifdbackend.demo.requetefinancement.entities.RequeteFinancement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*")
@RequestMapping("/ressource-exterieure/projet")
public class RessourceExterieureApi {

	@Autowired
	private ProjetProgrammeIdeeDao projetProgrammeIdeeDao;

	@Autowired
	private RessourceExterieureDao ressourceExterieureDao;

	@Autowired
	private RequeteFinancementDao requeteFinancementDao;

	@GetMapping(value = "/list/{id}")
	public List<RessourceExterieure> getRessourceExterieures(@PathVariable("id") Long id) {
		List<RessourceExterieure>  ressources = ressourceExterieureDao.
				findByStatusAndProjetProgrammeIdee(false, projetProgrammeIdeeDao.findById(id).get());
		
		return ressources;
	}


	@PostMapping(value = "/save-alone")
	public RessourceExterieure saveAlone(@RequestBody RessourceExterieure ressourceExterieure) {
		
		return	ressourceExterieureDao.saveAndFlush(ressourceExterieure);
	}
	
	

	@PostMapping(value = "/save/{id}")
	public RessourceExterieure save(@PathVariable("id") Long id, @RequestBody RessourceExterieure ressourceExterieure) {
		
		ProjetProgrammeIdee projet = projetProgrammeIdeeDao.findById(id).get();
		ressourceExterieure.setProjetProgrammeIdee(projet);
		return	ressourceExterieureDao.saveAndFlush(ressourceExterieure);
	}

	@PostMapping(value = "/delete")
	public RessourceExterieure delete(@RequestBody RessourceExterieure ressourceExterieure) {
		Optional<RessourceExterieure> ressourceExterieureOther = ressourceExterieureDao.findById(ressourceExterieure.getId());
		if(ressourceExterieureOther.get() != null) {
			ressourceExterieureOther.get().setStatus(true);
			RequeteFinancement requeteFinancement = ressourceExterieureOther.get().getRequeteFinancement();
			if(requeteFinancement != null) {
				requeteFinancement.setStatus(true);
				requeteFinancementDao.saveAndFlush(requeteFinancement);
				ressourceExterieureDao.saveAndFlush(ressourceExterieureOther.get());
			} else {
				ressourceExterieureDao.delete(ressourceExterieureOther.get());
			}
			
		}
		
		return ressourceExterieure;
	}
	
	
	@GetMapping(value = "/open/{id}")
	public RessourceExterieure open(@PathVariable("id") Long id) {
		RessourceExterieure re = ressourceExterieureDao.findById(id).get();
		re.setIsStatusClose(false);
		re.setLibelle(null);
		re.setProjetProgrammeIdee(null);
		ressourceExterieureDao.saveAndFlush(re);
		return	re;
	}
	
	@GetMapping(value = "/close/{id}/{typeCloture}")
	public RessourceExterieure close(@PathVariable("id") Long id, @PathVariable("typeCloture") String typeCloture) {
		RessourceExterieure re = ressourceExterieureDao.findById(id).get();
		re.setIsStatusClose(true);
		re.setLibelle(typeCloture);
		re.setDateCloture(new Date());
		ressourceExterieureDao.saveAndFlush(re);
		return	re;
	}
	

	@RequestMapping(value="/detail/{id}", method = RequestMethod.GET)
	public RessourceExterieure getById(@PathVariable("id") Long id) {

		return	ressourceExterieureDao.findById(id).get();
	}

	
}
