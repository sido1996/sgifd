package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.SexeDao;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.Secteur;
import com.sgifdbackend.demo.parametrage.entites.Sexe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/sexe")
public class SexeApi {


//	@Autowired
//	private sexeDao sexeDao;
	
	@Autowired
	private SexeDao sexeDao;


	@GetMapping(value = "/list")
	public List<Sexe> getSexes() {
		return sexeDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public Sexe save(@RequestBody Sexe sexe) {



//		sexe.setCreateBy();
		return	sexeDao.saveAndFlush(sexe);
	}

	@PostMapping(value = "/delete")
	public Sexe delete(@RequestBody Sexe Sexe) {

		Sexe.setStatus(true);
		return	sexeDao.saveAndFlush(Sexe);
	}

	@GetMapping(value = "/get/{id}")
	public Sexe getById(@PathVariable("id") Long id) {
		return sexeDao.findById(id).get();
	}

}
