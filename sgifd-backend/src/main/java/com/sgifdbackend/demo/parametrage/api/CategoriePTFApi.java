package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.CategoriePTFDao;
import com.sgifdbackend.demo.parametrage.entites.CategoriePTF;
import com.sgifdbackend.demo.parametrage.entites.CategorieProjet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/categorie-ptf")
public class CategoriePTFApi {


//	@Autowired
//	private categoriePTFDao categoriePTFDao;
	
	@Autowired
	private CategoriePTFDao categoriePTFDao;


	@GetMapping(value = "/list")
	public List<CategoriePTF> getCategoriePTFs() {
		return categoriePTFDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public CategoriePTF save(@RequestBody CategoriePTF categoriePTF) {



//		categoriePTF.setCreateBy();
		return	categoriePTFDao.saveAndFlush(categoriePTF);
	}

	@PostMapping(value = "/delete")
	public CategoriePTF delete(@RequestBody CategoriePTF CategoriePTF) {

		CategoriePTF.setStatus(true);
		return	categoriePTFDao.saveAndFlush(CategoriePTF);
	}
	
	@GetMapping(value = "/get/{id}")
	public CategoriePTF getById(@PathVariable("id") Long id) {
		return categoriePTFDao.findById(id).get();
	}

}
