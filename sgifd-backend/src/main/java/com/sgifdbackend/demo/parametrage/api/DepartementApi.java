package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.DepartementDao;
import com.sgifdbackend.demo.parametrage.entites.CycleBourseEtude;
import com.sgifdbackend.demo.parametrage.entites.Departement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/departement")
public class DepartementApi {


//	@Autowired
//	private departementDao departementDao;
	
	@Autowired
	private DepartementDao departementDao;


	@GetMapping(value = "/list")
	public List<Departement> getDepartements() {
		return departementDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public Departement save(@RequestBody Departement departement) {

//		departement.setCreateBy();
		return	departementDao.saveAndFlush(departement);
	}

	@PostMapping(value = "/delete")
	public Departement delete(@RequestBody Departement Departement) {

		Departement.setStatus(true);
		return	departementDao.saveAndFlush(Departement);
	}
	
	@GetMapping(value = "/get/{id}")
	public Departement getById(@PathVariable("id") Long id) {
		return departementDao.findById(id).get();
	}

}
