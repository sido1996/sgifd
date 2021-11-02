package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.DeviseMonnaieHistDao;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaieHist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/devise-monnaie-hist")
public class DeviseMonnaieHistApi {


//	@Autowired
//	private deviseMonnaieHistDao deviseMonnaieHistDao;
	
	@Autowired
	private DeviseMonnaieHistDao deviseMonnaieHistDao;


	@GetMapping(value = "/list")
	public List<DeviseMonnaieHist> getDeviseMonnaieHists() {
		return deviseMonnaieHistDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public DeviseMonnaieHist save(@RequestBody DeviseMonnaieHist deviseMonnaieHist) {



//		deviseMonnaieHist.setCreateBy();
		return	deviseMonnaieHistDao.saveAndFlush(deviseMonnaieHist);
	}

	@PostMapping(value = "/delete")
	public DeviseMonnaieHist delete(@RequestBody DeviseMonnaieHist DeviseMonnaieHist) {

		DeviseMonnaieHist.setStatus(true);
		return	deviseMonnaieHistDao.saveAndFlush(DeviseMonnaieHist);
	}
	
	@GetMapping(value = "/get/{id}")
	public DeviseMonnaieHist getById(@PathVariable("id") Long id) {
		return deviseMonnaieHistDao.findById(id).get();
	}

}
