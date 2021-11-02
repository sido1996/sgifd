package com.sgifdbackend.demo.projet.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.parametrage.dao.ProjetProgrammeIdeeDao;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.dao.LocalisationDao;
import com.sgifdbackend.demo.projet.entities.Localisation;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/localisation/projet")
public class LocalisationApi {

	@Autowired
	private ProjetProgrammeIdeeDao projetProgrammeIdeeDao;

	@Autowired
	private LocalisationDao localisationDao;

	@GetMapping(value = "/list/{id}")
	public List<Localisation> getRessourceExterieures(@PathVariable("id") Long id) {
		List<Localisation>  localisation = localisationDao.
				findByStatusAndProjetProgrammeIdee(false, projetProgrammeIdeeDao.findById(id).get());
		
		return localisation;
	}


	@PostMapping(value = "/save-alone")
	public Localisation saveAlone(@RequestBody Localisation localisation) {
		
		return	localisationDao.saveAndFlush(localisation);
	}

	@PostMapping(value = "/save/{id}")
	public Localisation save(@PathVariable("id") Long id, @RequestBody Localisation localisation) {
		
		ProjetProgrammeIdee projet = projetProgrammeIdeeDao.findById(id).get();
		localisation.setProjetProgrammeIdee(projet);
		return	localisationDao.saveAndFlush(localisation);
	}

	@PostMapping(value = "/delete")
	public Localisation delete(@RequestBody Localisation localisation) {
		localisationDao.delete(localisation);
		return localisation;
	}

	@RequestMapping(value="/detail/{id}", method = RequestMethod.GET)
	public Localisation getById(@PathVariable("id") Long id) {

		return	localisationDao.findById(id).get();
	}

}
