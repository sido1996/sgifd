package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.NiveauMaturiteDao;
import com.sgifdbackend.demo.parametrage.entites.NatureFinancement;
import com.sgifdbackend.demo.parametrage.entites.NiveauMaturite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/niveau-maturite")
public class NiveauMaturiteApi {


//	@Autowired
//	private niveauMaturiteDao niveauMaturiteDao;
	
	@Autowired
	private NiveauMaturiteDao niveauMaturiteDao;


	@GetMapping(value = "/list")
	public List<NiveauMaturite> getNiveauMaturites() {
		return niveauMaturiteDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public NiveauMaturite save(@RequestBody NiveauMaturite niveauMaturite) {



//		niveauMaturite.setCreateBy();
		return	niveauMaturiteDao.saveAndFlush(niveauMaturite);
	}

	@PostMapping(value = "/delete")
	public NiveauMaturite delete(@RequestBody NiveauMaturite NiveauMaturite) {

		NiveauMaturite.setStatus(true);
		return	niveauMaturiteDao.saveAndFlush(NiveauMaturite);
	}

	@GetMapping(value = "/get/{id}")
	public NiveauMaturite getById(@PathVariable("id") Long id) {
		return niveauMaturiteDao.findById(id).get();
	}

}
