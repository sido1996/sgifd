package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.AnneeDao;
import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.Envergure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/exercice")
public class ExerciceApi {


//	@Autowired
//	private anneeDao anneeDao;
	
	@Autowired
	private AnneeDao anneeDao;


	@GetMapping(value = "/list")
	public List<Annee> getAnnees() {
		return anneeDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public Annee save(@RequestBody Annee annee) {



//		annee.setCreateBy();
		return	anneeDao.saveAndFlush(annee);
	}

	@PostMapping(value = "/delete")
	public Annee delete(@RequestBody Annee Annee) {

		Annee.setStatus(true);
		return	anneeDao.saveAndFlush(Annee);
	}

	@GetMapping(value = "/get/{id}")
	public Annee getById(@PathVariable("id") Long id) {
		return anneeDao.findById(id).get();
	}

}
