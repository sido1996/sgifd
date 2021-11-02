package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.CycleBourseEtudeDao;
import com.sgifdbackend.demo.parametrage.entites.Commune;
import com.sgifdbackend.demo.parametrage.entites.CycleBourseEtude;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/cycle-bourse-formation")
public class CycleBourseEtudeApi {


//	@Autowired
//	private cycleBourseEtudeDao cycleBourseEtudeDao;
	
	@Autowired
	private CycleBourseEtudeDao cycleBourseEtudeDao;


	@GetMapping(value = "/list")
	public List<CycleBourseEtude> getCycleBourseEtudes() {
		return cycleBourseEtudeDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public CycleBourseEtude save(@RequestBody CycleBourseEtude cycleBourseEtude) {



//		cycleBourseEtude.setCreateBy();
		return	cycleBourseEtudeDao.saveAndFlush(cycleBourseEtude);
	}

	@PostMapping(value = "/delete")
	public CycleBourseEtude delete(@RequestBody CycleBourseEtude CycleBourseEtude) {

		CycleBourseEtude.setStatus(true);
		return	cycleBourseEtudeDao.saveAndFlush(CycleBourseEtude);
	}
	
	@GetMapping(value = "/get/{id}")
	public CycleBourseEtude getById(@PathVariable("id") Long id) {
		return cycleBourseEtudeDao.findById(id).get();
	}

}
