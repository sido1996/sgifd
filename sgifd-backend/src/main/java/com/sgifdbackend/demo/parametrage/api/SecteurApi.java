package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.SecteurDao;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.RegroupementClub;
import com.sgifdbackend.demo.parametrage.entites.Secteur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/secteur")
public class SecteurApi {


//	@Autowired
//	private secteurDao secteurDao;
	
	@Autowired
	private SecteurDao secteurDao;


	@GetMapping(value = "/list")
	public List<Secteur> getSecteurs() {
		return secteurDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public Secteur save(@RequestBody Secteur secteur) {



//		secteur.setCreateBy();
		return	secteurDao.saveAndFlush(secteur);
	}

	@PostMapping(value = "/delete")
	public Secteur delete(@RequestBody Secteur Secteur) {

		Secteur.setStatus(true);
		return	secteurDao.saveAndFlush(Secteur);
	}

	@GetMapping(value = "/get/{id}")
	public Secteur getById(@PathVariable("id") Long id) {
		return secteurDao.findById(id).get();
	}

	@GetMapping(value = "/get-by-grand-secteur/{id}")
	public List<Secteur> getByGrandSecteur(@PathVariable("id") Long id) {
		return secteurDao.findByStatusAndGrandSecteur_id(false, id);
	}

}
