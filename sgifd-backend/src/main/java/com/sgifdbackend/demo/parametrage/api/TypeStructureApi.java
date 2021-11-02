package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.TypeStructureDao;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.TypeRessourceInterieure;
import com.sgifdbackend.demo.parametrage.entites.TypeStructure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/type-structure")
public class TypeStructureApi {

//	@Autowired
//	private typeStructureDao typeStructureDao;
	
	@Autowired
	private TypeStructureDao typeStructureDao;

	@GetMapping(value = "/list")
	public List<TypeStructure> getTypeStructures() {
		return typeStructureDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public TypeStructure save(@RequestBody TypeStructure typeStructure) {

//		typeStructure.setCreateBy();
		return	typeStructureDao.saveAndFlush(typeStructure);
	}

	@PostMapping(value = "/delete")
	public TypeStructure delete(@RequestBody TypeStructure TypeStructure) {

		TypeStructure.setStatus(true);
		return	typeStructureDao.saveAndFlush(TypeStructure);
	}

	@GetMapping(value = "/get/{id}")
	public TypeStructure getById(@PathVariable("id") Long id) {
		return typeStructureDao.findById(id).get();
	}

}
