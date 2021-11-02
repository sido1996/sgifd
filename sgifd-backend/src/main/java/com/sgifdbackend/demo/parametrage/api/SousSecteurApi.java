package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.SousSecteurDao;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.Sexe;
import com.sgifdbackend.demo.parametrage.entites.SousSecteur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/sous-secteur")
public class SousSecteurApi {


//	@Autowired
//	private sousSecteurDao sousSecteurDao;
	
	@Autowired
	private SousSecteurDao sousSecteurDao;


	@GetMapping(value = "/list")
	public List<SousSecteur> getSousSecteurs() {
		return sousSecteurDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public SousSecteur save(@RequestBody SousSecteur sousSecteur) {



//		sousSecteur.setCreateBy();
		return	sousSecteurDao.saveAndFlush(sousSecteur);
	}

	@PostMapping(value = "/delete")
	public SousSecteur delete(@RequestBody SousSecteur SousSecteur) {

		SousSecteur.setStatus(true);
		return	sousSecteurDao.saveAndFlush(SousSecteur);
	}

	@GetMapping(value = "/get/{id}")
	public SousSecteur getById(@PathVariable("id") Long id) {
		return sousSecteurDao.findById(id).get();
	}

	@GetMapping(value = "/get-by-secteur/{id}")
	public  List<SousSecteur>  getBySecteur(@PathVariable("id") Long id) {
		return sousSecteurDao.findByStatusAndSecteur_id(false, id);
	}
	
}
