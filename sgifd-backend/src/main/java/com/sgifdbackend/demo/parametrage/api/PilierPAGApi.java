package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.PilierPAGDao;
import com.sgifdbackend.demo.parametrage.entites.ODD;
import com.sgifdbackend.demo.parametrage.entites.PilierPAG;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/pilier-pag")
public class PilierPAGApi {


//	@Autowired
//	private pilierPAGDao pilierPAGDao;
	
	@Autowired
	private PilierPAGDao pilierPAGDao;


	@GetMapping(value = "/list")
	public List<PilierPAG> getPilierPAGs() {
		return pilierPAGDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public PilierPAG save(@RequestBody PilierPAG pilierPAG) {



//		pilierPAG.setCreateBy();
		return	pilierPAGDao.saveAndFlush(pilierPAG);
	}

	@PostMapping(value = "/delete")
	public PilierPAG delete(@RequestBody PilierPAG PilierPAG) {

		PilierPAG.setStatus(true);
		return	pilierPAGDao.saveAndFlush(PilierPAG);
	}

	@GetMapping(value = "/get/{id}")
	public PilierPAG getById(@PathVariable("id") Long id) {
		return pilierPAGDao.findById(id).get();
	}
	
}
