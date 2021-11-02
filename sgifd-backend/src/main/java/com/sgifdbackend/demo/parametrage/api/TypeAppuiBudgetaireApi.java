package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.TypeAppuiBudgetaireDao;
import com.sgifdbackend.demo.parametrage.entites.TypeAppuiBudgetaire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/type-appui-budgetaire")
public class TypeAppuiBudgetaireApi {

	
	@Autowired
	private TypeAppuiBudgetaireDao typeAppuiBudgetaireDao;


	@GetMapping(value = "/list")
	public List<TypeAppuiBudgetaire> getTypeAppuiBudgetaires() {
		return typeAppuiBudgetaireDao.findByStatus(false);
	}
	
	@PostMapping(value = "/save")
	public TypeAppuiBudgetaire save(@RequestBody TypeAppuiBudgetaire typeAssistance) {



//		typeAssistance.setCreateBy();
		return	typeAppuiBudgetaireDao.saveAndFlush(typeAssistance);
	}

	@PostMapping(value = "/delete")
	public TypeAppuiBudgetaire delete(@RequestBody TypeAppuiBudgetaire TypeAppuiBudgetaire) {

		TypeAppuiBudgetaire.setStatus(true);
		return	typeAppuiBudgetaireDao.saveAndFlush(TypeAppuiBudgetaire);
	}

	@GetMapping(value = "/get/{id}")
	public TypeAppuiBudgetaire getById(@PathVariable("id") Long id) {
		return typeAppuiBudgetaireDao.findById(id).get();
	}

}
