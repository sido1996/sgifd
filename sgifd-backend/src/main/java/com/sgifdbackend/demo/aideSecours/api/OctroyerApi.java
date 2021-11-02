package com.sgifdbackend.demo.aideSecours.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgifdbackend.demo.aideSecours.dao.AideSecoursDao;
import com.sgifdbackend.demo.aideSecours.dao.OctroyerDao;
import com.sgifdbackend.demo.aideSecours.entites.AideSecours;
import com.sgifdbackend.demo.aideSecours.entites.Octroyer;

@RestController
@CrossOrigin("*")
@RequestMapping("/bourse")
public class OctroyerApi {
	@Autowired
	private OctroyerDao octroyerDao;

	@GetMapping(value = "/list")
	public List<Octroyer> getOctroyer() {
		return octroyerDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public Octroyer save(@RequestBody Octroyer octroyer) {

		return	octroyerDao.saveAndFlush(octroyer);
	}

	@PostMapping(value = "/delete")
	public Octroyer delete(@RequestBody Octroyer octroyer) {

			octroyerDao.delete(octroyer);
			return octroyer;
	}
	
	@PostMapping(value = "/delete-modification")
	public Octroyer deleteModification(@RequestBody Octroyer octroyer) {
			octroyer.setStatus(true);
			octroyerDao.saveAndFlush(octroyer);
			return octroyer;
	}
	
	@PostMapping(value = "/deleteonupdate")
	public Octroyer deleteOnModification(@RequestBody Octroyer octroyer) {
		
			octroyer.setStatus(true);
			return	octroyerDao.saveAndFlush(octroyer);
	}



}
