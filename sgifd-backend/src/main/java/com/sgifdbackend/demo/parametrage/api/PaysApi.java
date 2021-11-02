package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.PaysDao;
import com.sgifdbackend.demo.parametrage.entites.Pays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/pays")
public class PaysApi {


//	@Autowired
//	private paysDao paysDao;
	
	@Autowired
	private PaysDao paysDao;


	@GetMapping(value = "/list")
	public List<Pays> getPayss() {
		return paysDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public Pays save(@RequestBody Pays pays) {

//		pays.setCreateBy();
		return	paysDao.saveAndFlush(pays);
	}

	@PostMapping(value = "/delete")
	public Pays delete(@RequestBody Pays Pays) {

		Pays.setStatus(true);
		return	paysDao.saveAndFlush(Pays);
	}

	@GetMapping(value = "/get/{id}")
	public Pays getById(@PathVariable("id") Long id) {
		return paysDao.findById(id).get();
	}
	
}
