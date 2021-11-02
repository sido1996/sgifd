package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.ContientDao;
import com.sgifdbackend.demo.parametrage.entites.Continent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/continent")
public class ContinentApi {


//	@Autowired
//	private continentDao continentDao;
	
	@Autowired
	private ContientDao continentDao;


	@GetMapping(value = "/list")
	public List<Continent> getPayss() {
		return continentDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public Continent save(@RequestBody Continent continent) {

//		continent.setCreateBy();
		return	continentDao.saveAndFlush(continent);
	}

	@PostMapping(value = "/delete")
	public Continent delete(@RequestBody Continent Continent) {

		Continent.setStatus(true);
		return	continentDao.saveAndFlush(Continent);
	}

	@GetMapping(value = "/get/{id}")
	public Continent getById(@PathVariable("id") Long id) {
		return continentDao.findById(id).get();
	}
	
}
