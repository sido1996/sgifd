package com.sgifdbackend.demo.accord.api;

import com.sgifdbackend.demo.accord.dao.AccordDao;
import com.sgifdbackend.demo.accord.entites.Accord;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.requetefinancement.entities.RequeteFinancement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/accord")
public class AccordApi {

	@Autowired
	private AccordDao accordDao;

	@GetMapping(value = "/list")
	public List<Accord> getAccords() {
		return accordDao.findByStatus(false);
	}

	@GetMapping(value = "/list-by-annee/{id}")
	public List<Accord> getAccordsByAnnee(@PathVariable("id") Long id) {
		return accordDao.findByStatusAndAnnee_id(false, id);
	}

	@PostMapping(value = "/save")
	public Accord save(@RequestBody Accord accord) {

//		accord.setCreateBy();
		return	accordDao.saveAndFlush(accord);
	}

	@PostMapping(value = "/delete")
	public Accord delete(@RequestBody Accord Accord) {

		Accord.setStatus(true);
		return	accordDao.saveAndFlush(Accord);
	}

	@GetMapping(value="/detail/{id}")
	public Accord getById(@PathVariable("id") Long id) {

		return	accordDao.findById(id).get();
	}
	
	@PostMapping(value = "/save-file/{id}")
	public Accord saveFile(@PathVariable("id") Long id, @RequestBody DBFile dBFile) {
		Accord accord = accordDao.findById(id).get();
		accord.getFiles().add(dBFile);
		dBFile.setAccord(accord);

		return	accordDao.saveAndFlush(accord);
	}
}
