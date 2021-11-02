package com.sgifdbackend.demo.projet.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.parametrage.dao.ProjetProgrammeIdeeDao;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.dao.RessourceExterieureAnnuelleDao;
import com.sgifdbackend.demo.projet.dao.RessourceExterieureDao;
import com.sgifdbackend.demo.projet.dao.RessourceInterieureAnnuelleDao;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.projet.entities.RessourceExterieureAnnuelle;
import com.sgifdbackend.demo.projet.entities.RessourceInterieureAnnuelle;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/ressource-interieure-annuelle/projet")
public class RessourceInterieureAnuelleApi {

	@Autowired
	private ProjetProgrammeIdeeDao projetProgrammeIdeeDao;

	@Autowired
	private RessourceInterieureAnnuelleDao ressourceInterieureAnnuelleDao;

	@GetMapping(value = "/list/{id}")
	public List<RessourceInterieureAnnuelle> getRessourceInterieureAnuelle(@PathVariable("id") Long id) {
		List<RessourceInterieureAnnuelle>  ressources = ressourceInterieureAnnuelleDao.
				findByStatusAndProjetProgrammeIdee(false, projetProgrammeIdeeDao.findById(id).get());
		
		return ressources;
	}


	@PostMapping(value = "/save/{id}")
	public RessourceInterieureAnnuelle save(@PathVariable("id") Long id, @RequestBody RessourceInterieureAnnuelle ressourceInterieureAnnuelle) {
		
		ProjetProgrammeIdee projet = projetProgrammeIdeeDao.findById(id).get();
		ressourceInterieureAnnuelle.setProjetProgrammeIdee(projet);
		return	ressourceInterieureAnnuelleDao.saveAndFlush(ressourceInterieureAnnuelle);
	}

	@PostMapping(value = "/delete")
	public RessourceInterieureAnnuelle delete(@RequestBody RessourceInterieureAnnuelle ressourceInterieureAnnuelle) {
		ressourceInterieureAnnuelleDao.delete(ressourceInterieureAnnuelle);
		return	ressourceInterieureAnnuelle;
	}

	@RequestMapping(value="/detail/{id}", method = RequestMethod.GET)
	public RessourceInterieureAnnuelle getById(@PathVariable("id") Long id) {

		return	ressourceInterieureAnnuelleDao.findById(id).get();
	}

}
