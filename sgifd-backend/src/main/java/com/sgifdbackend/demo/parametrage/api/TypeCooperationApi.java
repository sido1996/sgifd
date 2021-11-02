package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.TypeCooperationDao;
import com.sgifdbackend.demo.parametrage.entites.TypeBourseEtude;
import com.sgifdbackend.demo.parametrage.entites.TypeCooperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/type-cooperation")
public class TypeCooperationApi {


//	@Autowired
//	private typeCooperationDao typeCooperationDao;
	
	@Autowired
	private TypeCooperationDao typeCooperationDao;


	@GetMapping(value = "/list")
	public List<TypeCooperation> getTypeCooperations() {
		return typeCooperationDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public TypeCooperation save(@RequestBody TypeCooperation typeCooperation) {



//		typeCooperation.setCreateBy();
		return	typeCooperationDao.saveAndFlush(typeCooperation);
	}

	@PostMapping(value = "/delete")
	public TypeCooperation delete(@RequestBody TypeCooperation TypeCooperation) {

		TypeCooperation.setStatus(true);
		return	typeCooperationDao.saveAndFlush(TypeCooperation);
	}

	@GetMapping(value = "/get/{id}")
	public TypeCooperation getById(@PathVariable("id") Long id) {
		return typeCooperationDao.findById(id).get();
	}

}
