package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.TypeAssistanceDao;
import com.sgifdbackend.demo.parametrage.entites.TypeAccord;
import com.sgifdbackend.demo.parametrage.entites.TypeAssistance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/type-assistance")
public class TypeAssistanceApi {


//	@Autowired
//	private typeAssistanceDao typeAssistanceDao;
	
	@Autowired
	private TypeAssistanceDao typeAssistanceDao;


	@GetMapping(value = "/list")
	public List<TypeAssistance> getTypeAssistances() {
		return typeAssistanceDao.findByStatus(false);
	}
	
	@GetMapping(value = "/list-appui")
	public List<TypeAssistance> listTypeAssistancesAvecAppui() {
		return typeAssistanceDao.findByStatusAndIsAppui(false, true);
	}



	@PostMapping(value = "/save")
	public TypeAssistance save(@RequestBody TypeAssistance typeAssistance) {



//		typeAssistance.setCreateBy();
		return	typeAssistanceDao.saveAndFlush(typeAssistance);
	}

	@PostMapping(value = "/delete")
	public TypeAssistance delete(@RequestBody TypeAssistance TypeAssistance) {

		TypeAssistance.setStatus(true);
		return	typeAssistanceDao.saveAndFlush(TypeAssistance);
	}

	@GetMapping(value = "/get/{id}")
	public TypeAssistance getById(@PathVariable("id") Long id) {
		return typeAssistanceDao.findById(id).get();
	}

}
