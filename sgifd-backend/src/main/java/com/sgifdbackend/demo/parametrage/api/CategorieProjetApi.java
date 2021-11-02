package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.CategorieProjetDao;
import com.sgifdbackend.demo.parametrage.entites.AxePrioritaire;
import com.sgifdbackend.demo.parametrage.entites.CategorieProjet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/categorie-projet")
public class CategorieProjetApi {

	@Autowired
	private CategorieProjetDao categorieProjetDao;


	@GetMapping(value = "/list")
	public List<CategorieProjet> getCategorieProjets() {
		return categorieProjetDao.findByStatus(false);
	}

	@PostMapping(value = "/save")
	public CategorieProjet save(@RequestBody CategorieProjet categorieProjet) {

//		CategorieProjet.setCreateBy();
		return	categorieProjetDao.saveAndFlush(categorieProjet);
	}

	@PostMapping(value = "/delete")
	public CategorieProjet delete(@RequestBody CategorieProjet categorieProjet) {

		categorieProjet.setStatus(true);
		return	categorieProjetDao.saveAndFlush(categorieProjet);
	}
	
	@GetMapping(value = "/get/{id}")
	public CategorieProjet getById(@PathVariable("id") Long id) {
		return categorieProjetDao.findById(id).get();
	}

}
