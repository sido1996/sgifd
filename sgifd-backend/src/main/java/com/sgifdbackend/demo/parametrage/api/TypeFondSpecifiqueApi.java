package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.TypeFondSpecifiqueDao;
import com.sgifdbackend.demo.parametrage.entites.TypeFondSpecifique;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/type-fond-specifique")
public class TypeFondSpecifiqueApi {

	@Autowired
	private TypeFondSpecifiqueDao typeFondSpecifiqueDao;


	@GetMapping(value = "/list")
	public List<TypeFondSpecifique> getTypeFondSpecifiques() {
		
		return typeFondSpecifiqueDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public TypeFondSpecifique save(@RequestBody TypeFondSpecifique typeFondSpecifique) {

		return	typeFondSpecifiqueDao.saveAndFlush(typeFondSpecifique);
	}

	@PostMapping(value = "/delete")
	public TypeFondSpecifique delete(@RequestBody TypeFondSpecifique TypeFondSpecifique) {

		TypeFondSpecifique.setStatus(true);
		return	typeFondSpecifiqueDao.saveAndFlush(TypeFondSpecifique);
	}

	@GetMapping(value = "/get/{id}")
	public TypeFondSpecifique getById(@PathVariable("id") Long id) {
		
		return typeFondSpecifiqueDao.findById(id).get();
	}

}
