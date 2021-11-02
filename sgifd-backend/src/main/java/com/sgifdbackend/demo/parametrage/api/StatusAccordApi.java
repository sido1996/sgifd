package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.StatusAccordDao;
import com.sgifdbackend.demo.parametrage.entites.StatusAccord;
import com.sgifdbackend.demo.parametrage.entites.Envergure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/status-accord")
public class StatusAccordApi {


//	@Autowired
//	private statusAccordDao statusAccordDao;
	
	@Autowired
	private StatusAccordDao statusAccordDao;


	@GetMapping(value = "/list")
	public List<StatusAccord> getStatusAccords() {
		return statusAccordDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public StatusAccord save(@RequestBody StatusAccord statusAccord) {

		return	statusAccordDao.saveAndFlush(statusAccord);
	}

	@PostMapping(value = "/delete")
	public StatusAccord delete(@RequestBody StatusAccord statusAccord) {

		statusAccord.setStatus(true);
		return	statusAccordDao.saveAndFlush(statusAccord);
	}

	@GetMapping(value = "/get/{id}")
	public StatusAccord getById(@PathVariable("id") Long id) {
		return statusAccordDao.findById(id).get();
	}

}
