package com.sgifdbackend.demo.projet.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.parametrage.dao.ProjetProgrammeIdeeDao;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.dao.SecteurImpacteDao;
import com.sgifdbackend.demo.projet.entities.SecteurImpacte;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/secteur-impacte/projet")
public class SecteurImpacteApi {

	@Autowired
	private ProjetProgrammeIdeeDao projetProgrammeIdeeDao;

	@Autowired
	private SecteurImpacteDao secteurImpacteDao;

	@GetMapping(value = "/list/{id}")
	public List<SecteurImpacte> getRessourceExterieures(@PathVariable("id") Long id) {
		List<SecteurImpacte>  secteurImpacte = secteurImpacteDao.
				findByStatusAndProjetProgrammeIdee(false, projetProgrammeIdeeDao.findById(id).get());
		
		return secteurImpacte;
	}


	@PostMapping(value = "/save-alone")
	public SecteurImpacte saveAlone(@RequestBody SecteurImpacte secteurImpacte) {
		
		return	secteurImpacteDao.saveAndFlush(secteurImpacte);
	}

	@PostMapping(value = "/save/{id}")
	public SecteurImpacte save(@PathVariable("id") Long id, @RequestBody SecteurImpacte secteurImpacte) {
		
		ProjetProgrammeIdee projet = projetProgrammeIdeeDao.findById(id).get();
		secteurImpacte.setProjetProgrammeIdee(projet);
		return	secteurImpacteDao.saveAndFlush(secteurImpacte);
	}

	@PostMapping(value = "/delete")
	public SecteurImpacte delete(@RequestBody SecteurImpacte secteurImpacte) {
		secteurImpacteDao.delete(secteurImpacte);
		return secteurImpacte;
	}

	@RequestMapping(value="/detail/{id}", method = RequestMethod.GET)
	public SecteurImpacte getById(@PathVariable("id") Long id) {

		return	secteurImpacteDao.findById(id).get();
	}

}
