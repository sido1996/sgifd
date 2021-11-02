package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.AxePrioritaireDao;
import com.sgifdbackend.demo.parametrage.dao.PilierPAGDao;
import com.sgifdbackend.demo.parametrage.entites.AxePrioritaire;
import com.sgifdbackend.demo.parametrage.entites.Cible;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/axe-prioritaire")
public class AxePrioritaireApi {


//	@Autowired
//	private axeprioritaireDao axeprioritaireDao;
	
	@Autowired
	private AxePrioritaireDao axeprioritaireDao;

	@Autowired
	private PilierPAGDao pilierPAGDao;

	@GetMapping(value = "/list")
	public List<AxePrioritaire> getAxePrioritaires() {
		return axeprioritaireDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public AxePrioritaire save(@RequestBody AxePrioritaire axeprioritaire) {



//		axeprioritaire.setCreateBy();
		return	axeprioritaireDao.saveAndFlush(axeprioritaire);
	}

	@PostMapping(value = "/delete")
	public AxePrioritaire delete(@RequestBody AxePrioritaire AxePrioritaire) {

		AxePrioritaire.setStatus(true);
		return	axeprioritaireDao.saveAndFlush(AxePrioritaire);
	}
	
	@GetMapping(value = "/get/{id}")
	public AxePrioritaire getById(@PathVariable("id") Long id) {
		return axeprioritaireDao.findById(id).get();
	}


	@GetMapping(value = "/getByPilierPAG/{id}")
	public List<AxePrioritaire> getByPilierPAG(@PathVariable("id") Long id) {
		return axeprioritaireDao.findByStatusAndPilierPAG(false, pilierPAGDao.findById(id).get());
	}
}
