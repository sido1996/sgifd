package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.TypeBourseEtudeDao;
import com.sgifdbackend.demo.parametrage.entites.TypeAssistance;
import com.sgifdbackend.demo.parametrage.entites.TypeBourseEtude;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/type-bourse-etude")
public class TypeBourseEtudeApi {


//	@Autowired
//	private typeBourseEtudeDao typeBourseEtudeDao;
	
	@Autowired
	private TypeBourseEtudeDao typeBourseEtudeDao;


	@GetMapping(value = "/list")
	public List<TypeBourseEtude> getTypeBourseEtudes() {
		return typeBourseEtudeDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public TypeBourseEtude save(@RequestBody TypeBourseEtude typeBourseEtude) {



//		typeBourseEtude.setCreateBy();
		return	typeBourseEtudeDao.saveAndFlush(typeBourseEtude);
	}

	@PostMapping(value = "/delete")
	public TypeBourseEtude delete(@RequestBody TypeBourseEtude TypeBourseEtude) {

		TypeBourseEtude.setStatus(true);
		return	typeBourseEtudeDao.saveAndFlush(TypeBourseEtude);
	}

	@GetMapping(value = "/get/{id}")
	public TypeBourseEtude getById(@PathVariable("id") Long id) {
		return typeBourseEtudeDao.findById(id).get();
	}

}
