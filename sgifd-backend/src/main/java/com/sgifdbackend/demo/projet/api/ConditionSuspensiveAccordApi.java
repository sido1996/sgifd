package com.sgifdbackend.demo.projet.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.parametrage.dao.ProjetProgrammeIdeeDao;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.dao.ConditionSuspensiveAccordDao;
import com.sgifdbackend.demo.projet.entities.ConditionSuspensiveAccord;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/condition-suspensive-accord")
public class ConditionSuspensiveAccordApi {

	@Autowired
	private ConditionSuspensiveAccordDao conditionSuspensiveAccordDao;

	@Autowired
	private ProjetProgrammeIdeeDao projetProgrammeIdeeDao;

	@GetMapping(value = "/list/{id}")
	public List<ConditionSuspensiveAccord> getConditionSuspensiveAccords(@PathVariable("id") Long id) {
		return conditionSuspensiveAccordDao.findByStatusAndProjetProgrammeIdee(false, projetProgrammeIdeeDao.findById(id).get());
	}


	@PostMapping(value = "/save-alone")
	public ConditionSuspensiveAccord saveAlone(@RequestBody ConditionSuspensiveAccord conditionSuspensiveAccord) {
		
		return	conditionSuspensiveAccordDao.saveAndFlush(conditionSuspensiveAccord);
	}

	@PostMapping(value = "/save/{id}")
	public ConditionSuspensiveAccord save(@PathVariable("id") Long id, @RequestBody ConditionSuspensiveAccord conditionSuspensiveAccord) {
		ProjetProgrammeIdee projet = projetProgrammeIdeeDao.findById(id).get();
		conditionSuspensiveAccord.setProjetProgrammeIdee(projet);
		return	conditionSuspensiveAccordDao.saveAndFlush(conditionSuspensiveAccord);
	}

	@PostMapping(value = "/delete")
	public ConditionSuspensiveAccord delete(@RequestBody ConditionSuspensiveAccord ConditionSuspensiveAccord) {

		conditionSuspensiveAccordDao.delete(ConditionSuspensiveAccord);
		return ConditionSuspensiveAccord;
	}



}
