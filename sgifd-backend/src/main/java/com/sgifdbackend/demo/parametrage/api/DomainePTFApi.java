package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.DomainePTFDao;
import com.sgifdbackend.demo.parametrage.entites.DomaineActivite;
import com.sgifdbackend.demo.parametrage.entites.DomainePTF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/domaine-intervention")
public class DomainePTFApi {


//	@Autowired
//	private domainePTFDao domainePTFDao;
	
	@Autowired
	private DomainePTFDao domainePTFDao;


	@GetMapping(value = "/list")
	public List<DomainePTF> getDomainePTFs() {
		return domainePTFDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public DomainePTF save(@RequestBody DomainePTF aomainePTF) {

//		aomainePTF.setCreateBy();
		return	domainePTFDao.saveAndFlush(aomainePTF);
	}

	@PostMapping(value = "/delete")
	public DomainePTF delete(@RequestBody DomainePTF DomainePTF) {

		DomainePTF.setStatus(true);
		return	domainePTFDao.saveAndFlush(DomainePTF);
	}

	@GetMapping(value = "/get/{id}")
	public DomainePTF getById(@PathVariable("id") Long id) {
		return domainePTFDao.findById(id).get();
	}
	
}
