package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.NatureFinancementDao;
import com.sgifdbackend.demo.parametrage.entites.NatureAssistance;
import com.sgifdbackend.demo.parametrage.entites.NatureFinancement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/nature-financement")
public class NatureFinancementApi {


//	@Autowired
//	private natureFinancementDao natureFinancementDao;
	
	@Autowired
	private NatureFinancementDao natureFinancementDao;


	@GetMapping(value = "/list")
	public List<NatureFinancement> getNatureFinancements() {
		return natureFinancementDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public NatureFinancement save(@RequestBody NatureFinancement natureFinancement) {



//		natureFinancement.setCreateBy();
		return	natureFinancementDao.saveAndFlush(natureFinancement);
	}

	@PostMapping(value = "/delete")
	public NatureFinancement delete(@RequestBody NatureFinancement NatureFinancement) {

		NatureFinancement.setStatus(true);
		return	natureFinancementDao.saveAndFlush(NatureFinancement);
	}

	@GetMapping(value = "/get/{id}")
	public NatureFinancement getById(@PathVariable("id") Long id) {
		return natureFinancementDao.findById(id).get();
	}

}
