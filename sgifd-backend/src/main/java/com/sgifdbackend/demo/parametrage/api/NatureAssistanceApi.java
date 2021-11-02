package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.NatureAssistanceDao;
import com.sgifdbackend.demo.parametrage.entites.GrandSecteur;
import com.sgifdbackend.demo.parametrage.entites.NatureAssistance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/nature-assistance")
public class NatureAssistanceApi {


//	@Autowired
//	private natureAssistanceDao natureAssistanceDao;
	
	@Autowired
	private NatureAssistanceDao natureAssistanceDao;


	@GetMapping(value = "/list")
	public List<NatureAssistance> getNatureAssistances() {
		return natureAssistanceDao.findByStatus(false);
	}
	
	@GetMapping(value = "/list-appui")
	public List<NatureAssistance> listNatureAssistancesAvecAppui() {
		return natureAssistanceDao.findByStatusAndIsAppui(false, true);
	}


	@PostMapping(value = "/save")
	public NatureAssistance save(@RequestBody NatureAssistance natureAssistance) {



//		natureAssistance.setCreateBy();
		return	natureAssistanceDao.saveAndFlush(natureAssistance);
	}

	@PostMapping(value = "/delete")
	public NatureAssistance delete(@RequestBody NatureAssistance NatureAssistance) {

		NatureAssistance.setStatus(true);
		return	natureAssistanceDao.saveAndFlush(NatureAssistance);
	}

	@GetMapping(value = "/get/{id}")
	public NatureAssistance getById(@PathVariable("id") Long id) {
		return natureAssistanceDao.findById(id).get();
	}

}
