package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.EnvergureDao;
import com.sgifdbackend.demo.parametrage.entites.DomainePTF;
import com.sgifdbackend.demo.parametrage.entites.Envergure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/envergure")
public class EnvergureApi {


//	@Autowired
//	private envergureDao envergureDao;
	
	@Autowired
	private EnvergureDao envergureDao;


	@GetMapping(value = "/list")
	public List<Envergure> getEnvergures() {
		return envergureDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public Envergure save(@RequestBody Envergure envergure) {



//		envergure.setCreateBy();
		return	envergureDao.saveAndFlush(envergure);
	}

	@PostMapping(value = "/delete")
	public Envergure delete(@RequestBody Envergure Envergure) {

		Envergure.setStatus(true);
		return	envergureDao.saveAndFlush(Envergure);
	}

	@GetMapping(value = "/get/{id}")
	public Envergure getById(@PathVariable("id") Long id) {
		return envergureDao.findById(id).get();
	}
	
}
