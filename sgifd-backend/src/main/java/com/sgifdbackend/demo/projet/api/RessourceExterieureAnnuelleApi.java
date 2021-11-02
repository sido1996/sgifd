package com.sgifdbackend.demo.projet.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.projet.dao.RessourceExterieureAnnuelleDao;
import com.sgifdbackend.demo.projet.dao.RessourceExterieureDao;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.projet.entities.RessourceExterieureAnnuelle;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/ressource-exterieure-annuelle/projet")
public class RessourceExterieureAnnuelleApi {

	@Autowired
	private RessourceExterieureAnnuelleDao ressourceExterieureAnnuelleDao;

	@Autowired
	private RessourceExterieureDao ressourceExterieureDao;

	@GetMapping(value = "/list/{id}")
	public List<RessourceExterieureAnnuelle> getRessourceExterieureAnnuelles(@PathVariable("id") Long id) {
		List<RessourceExterieureAnnuelle>  ressources = ressourceExterieureAnnuelleDao.
				findByStatusAndRessourceExterieure(false, ressourceExterieureDao.findById(id).get());
		
		return ressources;
	}


	@PostMapping(value = "/save/{id}")
	public RessourceExterieureAnnuelle save(@PathVariable("id") Long id, @RequestBody RessourceExterieureAnnuelle ressourceExterieureAnnuelle) {
		
		RessourceExterieure ressourceExterieure = ressourceExterieureDao.findById(id).get();
		ressourceExterieureAnnuelle.setRessourceExterieure(ressourceExterieure);
		ressourceExterieureAnnuelle.setDeviseMonnaie(ressourceExterieure.getDeviseMonnaie());
		return	ressourceExterieureAnnuelleDao.saveAndFlush(ressourceExterieureAnnuelle);
	}

	@PostMapping(value = "/delete")
	public RessourceExterieureAnnuelle delete(@RequestBody RessourceExterieureAnnuelle ressourceExterieureAnnuelle) {
		ressourceExterieureAnnuelleDao.delete(ressourceExterieureAnnuelle);
		return	ressourceExterieureAnnuelle;
	}

	@RequestMapping(value="/detail/{id}", method = RequestMethod.GET)
	public RessourceExterieureAnnuelle getById(@PathVariable("id") Long id) {

		return	ressourceExterieureAnnuelleDao.findById(id).get();
	}

}
