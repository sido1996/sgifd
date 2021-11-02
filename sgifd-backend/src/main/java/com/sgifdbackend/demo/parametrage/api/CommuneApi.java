package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.CommuneDao;
import com.sgifdbackend.demo.parametrage.entites.CategoriePTF;
import com.sgifdbackend.demo.parametrage.entites.Commune;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/commune")
public class CommuneApi {


//	@Autowired
//	private communeDao communeDao;
	
	@Autowired
	private CommuneDao communeDao;


	@GetMapping(value = "/list")
	public List<Commune> getCommunes() {
		return communeDao.findByStatus(false);
	}
	
	@GetMapping(value = "/list/{id}")
	public List<Commune> getCommunesParDepartement(@PathVariable Long id) {
		return communeDao.findByDepartement_id(id);
	}

	@PostMapping(value = "/save")
	public Commune save(@RequestBody Commune commune) {

		return	communeDao.saveAndFlush(commune);
	}

	@PostMapping(value = "/delete")
	public Commune delete(@RequestBody Commune Commune) {

		Commune.setStatus(true);
		return	communeDao.saveAndFlush(Commune);
	}
	
	@GetMapping(value = "/get/{id}")
	public Commune getById(@PathVariable("id") Long id) {
		return communeDao.findById(id).get();
	}

}
