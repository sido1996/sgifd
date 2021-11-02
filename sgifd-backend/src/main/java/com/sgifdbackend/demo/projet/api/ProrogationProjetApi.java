package com.sgifdbackend.demo.projet.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.parametrage.dao.ProjetProgrammeIdeeDao;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.dao.LocalisationDao;
import com.sgifdbackend.demo.projet.dao.ProrogationProjetDao;
import com.sgifdbackend.demo.projet.entities.Localisation;
import com.sgifdbackend.demo.projet.entities.ProrogationProjet;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/prorogation/projet")
public class ProrogationProjetApi {

	@Autowired
	private ProjetProgrammeIdeeDao projetProgrammeIdeeDao;

	@Autowired
	private ProrogationProjetDao prorogationProjetDao;

	@GetMapping(value = "/list/{id}")
	public List<ProrogationProjet> getRessourceExterieures(@PathVariable("id") Long id) {
		List<ProrogationProjet>  prorogationProjets = prorogationProjetDao.
				findByStatusAndProjetProgrammeIdee(false, projetProgrammeIdeeDao.findById(id).get());
		
		return prorogationProjets;
	}


	@PostMapping(value = "/save-alone")
	public ProrogationProjet saveAlone(@RequestBody ProrogationProjet prorogationProjet) {
		
		return	prorogationProjetDao.saveAndFlush(prorogationProjet);
	}

	@PostMapping(value = "/save/{id}")
	public ProrogationProjet save(@PathVariable("id") Long id, @RequestBody ProrogationProjet prorogationProjet) {
		
		ProjetProgrammeIdee projet = projetProgrammeIdeeDao.findById(id).get();
		prorogationProjet.setProjetProgrammeIdee(projet);
		return	prorogationProjetDao.saveAndFlush(prorogationProjet);
	}

	@PostMapping(value = "/delete")
	public ProrogationProjet delete(@RequestBody ProrogationProjet prorogationProjet) {
		prorogationProjetDao.delete(prorogationProjet);
		return prorogationProjet;
	}

	@RequestMapping(value="/detail/{id}", method = RequestMethod.GET)
	public ProrogationProjet getById(@PathVariable("id") Long id) {

		return	prorogationProjetDao.findById(id).get();
	}

}
