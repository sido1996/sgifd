package com.sgifdbackend.demo.projet.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.parametrage.dao.ProjetProgrammeIdeeDao;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.dao.ConditionSuspensiveAccordDao;
import com.sgifdbackend.demo.projet.dao.ConditionSuspensiveDecaissementDao;
import com.sgifdbackend.demo.projet.entities.ConditionSuspensiveAccord;
import com.sgifdbackend.demo.projet.entities.ConditionSuspensiveDecaissement;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/condition-suspensive-decaissement")
public class ConditionSuspensiveDecaissementApi {

	@Autowired
	private ConditionSuspensiveDecaissementDao conditionSuspensiveDecaissementDao;

	@Autowired
	private ProjetProgrammeIdeeDao projetProgrammeIdeeDao;

	@GetMapping(value = "/list/{id}")
	public List<ConditionSuspensiveDecaissement> getConditionSuspensiveAccords(@PathVariable("id") Long id) {
		return conditionSuspensiveDecaissementDao.findByStatusAndProjetProgrammeIdee(false, projetProgrammeIdeeDao.findById(id).get());
	}


	@PostMapping(value = "/save-alone")
	public ConditionSuspensiveDecaissement saveAlone(@RequestBody ConditionSuspensiveDecaissement conditionSuspensiveDecaissement) {
		
		return	conditionSuspensiveDecaissementDao.saveAndFlush(conditionSuspensiveDecaissement);
	}

	@PostMapping(value = "/save/{id}")
	public ConditionSuspensiveDecaissement save(@PathVariable("id") Long id, @RequestBody ConditionSuspensiveDecaissement conditionSuspensiveDecaissement) {
		ProjetProgrammeIdee projet = projetProgrammeIdeeDao.findById(id).get();
		conditionSuspensiveDecaissement.setProjetProgrammeIdee(projet);
		return	conditionSuspensiveDecaissementDao.saveAndFlush(conditionSuspensiveDecaissement);
	}

	@PostMapping(value = "/delete")
	public ConditionSuspensiveDecaissement delete(@RequestBody ConditionSuspensiveDecaissement conditionSuspensiveDecaissement) {

		conditionSuspensiveDecaissementDao.delete(conditionSuspensiveDecaissement);
		return conditionSuspensiveDecaissement;
	}



}
