package com.sgifdbackend.demo.cooperationdecentralisee.api;

import com.sgifdbackend.demo.cooperationdecentralisee.dao.CooperationDecentraliseeDao;
import com.sgifdbackend.demo.cooperationdecentralisee.entities.CooperationDecentralisee;
import com.sgifdbackend.demo.parametrage.entites.DBFile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/cooperation-decentralisee")
public class CooperationDecentraliseeApi {

	@Autowired
	private CooperationDecentraliseeDao cooperationdecentraliseeDao;

	@GetMapping(value = "/list")
	public List<CooperationDecentralisee> getcooperationdecentralisees() {
		return cooperationdecentraliseeDao.findByStatus(false);
	}

	@PostMapping(value = "/save")
	public CooperationDecentralisee save(@RequestBody CooperationDecentralisee cooperationdecentralisee) {

//		cooperationdecentralisee.setCreateBy();
		return	cooperationdecentraliseeDao.saveAndFlush(cooperationdecentralisee);
	}

	@PostMapping(value = "/delete")
	public CooperationDecentralisee delete(@RequestBody CooperationDecentralisee cooperationdecentralisee) {

		cooperationdecentralisee.setStatus(true);
		return	cooperationdecentraliseeDao.saveAndFlush(cooperationdecentralisee);
	}

	@GetMapping(value="/detail/{id}")
	public CooperationDecentralisee getById(@PathVariable("id") Long id) {

		return	cooperationdecentraliseeDao.findById(id).get();
	}
	
	@PostMapping(value = "/save-file/{id}")
	public CooperationDecentralisee saveFile(@PathVariable("id") Long id, @RequestBody DBFile dBFile) {
		CooperationDecentralisee cooperationDecentralisee = cooperationdecentraliseeDao.findById(id).get();
		cooperationDecentralisee.getFiles().add(dBFile);
		dBFile.setCooperationDecentralisee(cooperationDecentralisee);

		return	cooperationdecentraliseeDao.saveAndFlush(cooperationDecentralisee);
	}

}
