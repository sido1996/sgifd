package com.sgifdbackend.demo.parametrage.api;


import com.sgifdbackend.demo.parametrage.dao.TypeAccordDao;
import com.sgifdbackend.demo.parametrage.entites.StructureBeneficiaire;
import com.sgifdbackend.demo.parametrage.entites.TypeAccord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/type-accord")
public class TypeAccordApi {


//	@Autowired
//	private typeAccordDao typeAccordDao;
	
	@Autowired
	private TypeAccordDao typeAccordDao;


	@GetMapping(value = "/list")
	public List<TypeAccord> getTypeAccords() {
		return typeAccordDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public TypeAccord save(@RequestBody TypeAccord typeAccord) {



//		typeAccord.setCreateBy();
		return	typeAccordDao.saveAndFlush(typeAccord);
	}

	@PostMapping(value = "/delete")
	public TypeAccord delete(@RequestBody TypeAccord TypeAccord) {

		TypeAccord.setStatus(true);
		return	typeAccordDao.saveAndFlush(TypeAccord);
	}

	@GetMapping(value = "/get/{id}")
	public TypeAccord getById(@PathVariable("id") Long id) {
		return typeAccordDao.findById(id).get();
	}

}
