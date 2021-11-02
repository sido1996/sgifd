package com.sgifdbackend.demo.parametrage.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.parametrage.dao.PromoteurDao;
import com.sgifdbackend.demo.parametrage.entites.Promoteur;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/promoteur")
public class PromoteurApi {

	@Autowired
	private PromoteurDao promoteurDao;


	@GetMapping(value = "/list")
	public List<Promoteur> getPromoteurs() {
		return promoteurDao.findByStatus(false);
	}
	

	@PostMapping(value = "/save")
	public Promoteur save(@RequestBody Promoteur promoteur) {
	
		promoteurDao.saveAndFlush(promoteur);

		return promoteur;

	}

	@PostMapping(value = "/delete")
	public Promoteur delete(@RequestBody Promoteur Promoteur) {

		Promoteur.setStatus(true);
		promoteurDao.saveAndFlush(Promoteur);
		
		return Promoteur;
	}



}
