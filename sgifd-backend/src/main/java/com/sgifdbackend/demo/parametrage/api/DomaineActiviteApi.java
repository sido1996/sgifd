package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.DomaineActiviteDao;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaieHist;
import com.sgifdbackend.demo.parametrage.entites.DomaineActivite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/domaine-activite")
public class DomaineActiviteApi {


//	@Autowired
//	private domaineActiviteDao domaineActiviteDao;
	
	@Autowired
	private DomaineActiviteDao domaineActiviteDao;


	@GetMapping(value = "/list")
	public List<DomaineActivite> getDomaineActivites() {
		return domaineActiviteDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public DomaineActivite save(@RequestBody DomaineActivite domaineActivite) {

//		domaineActivite.setCreateBy();
		return	domaineActiviteDao.saveAndFlush(domaineActivite);
	}

	@PostMapping(value = "/delete")
	public DomaineActivite delete(@RequestBody DomaineActivite DomaineActivite) {

		DomaineActivite.setStatus(true);
		return	domaineActiviteDao.saveAndFlush(DomaineActivite);
	}
	
	@GetMapping(value = "/get/{id}")
	public DomaineActivite getById(@PathVariable("id") Long id) {
		return domaineActiviteDao.findById(id).get();
	}

}
