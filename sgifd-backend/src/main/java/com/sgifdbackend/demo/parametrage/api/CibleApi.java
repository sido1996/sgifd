package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.CibleDao;
import com.sgifdbackend.demo.parametrage.dao.ODDDao;
import com.sgifdbackend.demo.parametrage.entites.Cible;
import com.sgifdbackend.demo.parametrage.entites.Pays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/cible")
public class CibleApi {


//	@Autowired
//	private cibleDao cibleDao;
	
	@Autowired
	private CibleDao cibleDao;

	@Autowired
	private ODDDao oDDDao;

	@GetMapping(value = "/list")
	public List<Cible> getCibles() {
		return cibleDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public Cible save(@RequestBody Cible cible) {

		return	cibleDao.saveAndFlush(cible);
	}

	@PostMapping(value = "/delete")
	public Cible delete(@RequestBody Cible Cible) {

		Cible.setStatus(true);
		return	cibleDao.saveAndFlush(Cible);
	}

	@GetMapping(value = "/get/{id}")
	public Cible getById(@PathVariable("id") Long id) {
		return cibleDao.findById(id).get();
	}


	@GetMapping(value = "/getByODD/{id}")
	public List<Cible> getByODD(@PathVariable("id") Long id) {
		return cibleDao.findByStatusAndOdd(false, oDDDao.findById(id).get());
	}

}
