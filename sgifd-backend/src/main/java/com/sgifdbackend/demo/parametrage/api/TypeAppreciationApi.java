package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.TypeAppreciationDao;
import com.sgifdbackend.demo.parametrage.entites.TypeAppreciation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/type-appreciation")
public class TypeAppreciationApi {


//	@Autowired
//	private typeappreciationDao typeappreciationDao;
	
	@Autowired
	private TypeAppreciationDao typeappreciationDao;


	@GetMapping(value = "/list")
	public List<TypeAppreciation> getTypeAppreciations() {
		return typeappreciationDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public TypeAppreciation save(@RequestBody TypeAppreciation typeappreciation) {

//		typeappreciation.setCreateBy();
		return	typeappreciationDao.saveAndFlush(typeappreciation);
	}

	@PostMapping(value = "/delete")
	public TypeAppreciation delete(@RequestBody TypeAppreciation TypeAppreciation) {

		TypeAppreciation.setStatus(true);
		return	typeappreciationDao.saveAndFlush(TypeAppreciation);
	}

	@GetMapping(value = "/get/{id}")
	public TypeAppreciation getById(@PathVariable("id") Long id) {
		return typeappreciationDao.findById(id).get();
	}

}
