package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.PTFBailleursFrsDao;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.PilierPAG;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/ptf-fournisseur-bailleur")
public class PTFBailleursFrsApi {

	@Autowired
	private PTFBailleursFrsDao pTFBailleursFrsDao;


	@GetMapping(value = "/list")
	public List<PTFBailleurFrs> getPTFBailleursFrss() {
		return pTFBailleursFrsDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public PTFBailleurFrs save(@RequestBody PTFBailleurFrs pTFBailleursFrs) {

		return	pTFBailleursFrsDao.saveAndFlush(pTFBailleursFrs);
	}

	@PostMapping(value = "/delete")
	public PTFBailleurFrs delete(@RequestBody PTFBailleurFrs PTFBailleursFrs) {

		PTFBailleursFrs.setStatus(true);
		return	pTFBailleursFrsDao.saveAndFlush(PTFBailleursFrs);
	}

	@GetMapping(value = "/get/{id}")
	public PTFBailleurFrs getById(@PathVariable("id") Long id) {
		return pTFBailleursFrsDao.findById(id).get();
	}

}
