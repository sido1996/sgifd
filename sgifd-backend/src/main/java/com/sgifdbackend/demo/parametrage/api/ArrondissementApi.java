package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.ArrondissementDao;
import com.sgifdbackend.demo.parametrage.entites.Arrondissement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/arrondissement")
public class ArrondissementApi {


//	@Autowired
//	private arrondissementDao arrondissementDao;
	
	@Autowired
	private ArrondissementDao arrondissementDao;


	@GetMapping(value = "/list")
	public List<Arrondissement> getArrondissements() {
		return arrondissementDao.findByStatus(false);
	}
	
	@GetMapping(value = "/list/{id}")
	public List<Arrondissement> getArrondissementsParCommune(@PathVariable Long id) {
		return arrondissementDao.findByCommune_id(id);
	}

	@PostMapping(value = "/save")
	public Arrondissement save(@RequestBody Arrondissement arrondissement) {



//		arrondissement.setCreateBy();
		return	arrondissementDao.saveAndFlush(arrondissement);
	}

	@PostMapping(value = "/delete")
	public Arrondissement delete(@RequestBody Arrondissement Arrondissement) {

		Arrondissement.setStatus(true);
		return	arrondissementDao.saveAndFlush(Arrondissement);
	}


}
