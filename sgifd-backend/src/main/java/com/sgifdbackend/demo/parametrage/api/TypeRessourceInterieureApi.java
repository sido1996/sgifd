package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.TypeRessourceInterieureDao;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.TypeCooperation;
import com.sgifdbackend.demo.parametrage.entites.TypeRessourceInterieure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/type-ressource-interieure")
public class TypeRessourceInterieureApi {


//	@Autowired
//	private typeRessourceInterieureDao typeRessourceInterieureDao;
	
	@Autowired
	private TypeRessourceInterieureDao typeRessourceInterieureDao;


	@GetMapping(value = "/list")
	public List<TypeRessourceInterieure> getTypeRessourceInterieures() {
		return typeRessourceInterieureDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public TypeRessourceInterieure save(@RequestBody TypeRessourceInterieure typeRessourceInterieure) {



//		typeRessourceInterieure.setCreateBy();
		return	typeRessourceInterieureDao.saveAndFlush(typeRessourceInterieure);
	}

	@PostMapping(value = "/delete")
	public TypeRessourceInterieure delete(@RequestBody TypeRessourceInterieure TypeRessourceInterieure) {

		TypeRessourceInterieure.setStatus(true);
		return	typeRessourceInterieureDao.saveAndFlush(TypeRessourceInterieure);
	}

	@GetMapping(value = "/get/{id}")
	public TypeRessourceInterieure getById(@PathVariable("id") Long id) {
		return typeRessourceInterieureDao.findById(id).get();
	}

}
