package com.sgifdbackend.demo.accord.api;

import com.sgifdbackend.demo.accord.dao.ConditionSuspensiveUnDecaissementDao;
import com.sgifdbackend.demo.accord.entites.ConditionSuspensiveUnDecaissement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/condition-suspensive-premier-decaissement")
public class ConditionSuspensiveUnDecaissementApi {

	@Autowired
	private ConditionSuspensiveUnDecaissementDao conditionSuspensiveUnDecaissementDao;

	@GetMapping(value = "/list")
	public List<ConditionSuspensiveUnDecaissement> getConditionSuspensiveUnDecaissements() {
		return conditionSuspensiveUnDecaissementDao.findByStatus(false);
	}

	@PostMapping(value = "/save")
	public ConditionSuspensiveUnDecaissement save(@RequestBody ConditionSuspensiveUnDecaissement conditionSuspensiveUnDecaissement) {
//		conditionSuspensiveUnDecaissement.setCreateBy();
		return	conditionSuspensiveUnDecaissementDao.saveAndFlush(conditionSuspensiveUnDecaissement);
	}

	@PostMapping(value = "/delete")
	public ConditionSuspensiveUnDecaissement delete(@RequestBody ConditionSuspensiveUnDecaissement ConditionSuspensiveUnDecaissement) {
			conditionSuspensiveUnDecaissementDao.delete(ConditionSuspensiveUnDecaissement);
			return ConditionSuspensiveUnDecaissement;
	}

}
