package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.DeviseMonnaieDao;
import com.sgifdbackend.demo.parametrage.entites.Departement;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/devise-monnaie")
public class DeviseMonnaieApi {


//	@Autowired
//	private deviseMonnaieDao deviseMonnaieDao;
	
	@Autowired
	private DeviseMonnaieDao deviseMonnaieDao;


	@GetMapping(value = "/list")
	public List<DeviseMonnaie> getDeviseMonnaies() {
		return deviseMonnaieDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public DeviseMonnaie save(@RequestBody DeviseMonnaie deviseMonnaie) {



//		deviseMonnaie.setCreateBy();
		return	deviseMonnaieDao.saveAndFlush(deviseMonnaie);
	}

	@PostMapping(value = "/delete")
	public DeviseMonnaie delete(@RequestBody DeviseMonnaie DeviseMonnaie) {

		DeviseMonnaie.setStatus(true);
		return	deviseMonnaieDao.saveAndFlush(DeviseMonnaie);
	}
	
	@GetMapping(value = "/get/{id}")
	public DeviseMonnaie getById(@PathVariable("id") Long id) {
		return deviseMonnaieDao.findById(id).get();
	}
	
}
