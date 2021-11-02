package com.sgifdbackend.demo.parametrage.api;


import com.sgifdbackend.demo.parametrage.dao.NatureAideAlimentaireDao;
import com.sgifdbackend.demo.parametrage.entites.NatureAideAlimentaire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/nature-aide-alimentaire")
public class NatureAideAlimentaireApi {
	
	@Autowired
	private NatureAideAlimentaireDao natureAideAlimentaireDao;


	@GetMapping(value = "/list")
	public List<NatureAideAlimentaire> getNatureAideAlimentaires() {
		return natureAideAlimentaireDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public NatureAideAlimentaire save(@RequestBody NatureAideAlimentaire natureAideAlimentaire) {



//		natureAideAlimentaire.setCreateBy();
		return	natureAideAlimentaireDao.saveAndFlush(natureAideAlimentaire);
	}

	@PostMapping(value = "/delete")
	public NatureAideAlimentaire delete(@RequestBody NatureAideAlimentaire NatureAideAlimentaire) {

		NatureAideAlimentaire.setStatus(true);
		return	natureAideAlimentaireDao.saveAndFlush(NatureAideAlimentaire);
	}

	@GetMapping(value = "/get/{id}")
	public NatureAideAlimentaire getById(@PathVariable("id") Long id) {
		return natureAideAlimentaireDao.findById(id).get();
	}

}
