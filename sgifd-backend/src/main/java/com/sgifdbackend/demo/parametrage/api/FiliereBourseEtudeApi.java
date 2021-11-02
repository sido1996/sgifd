package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.FiliereBourseEtudeDao;
import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.FiliereBourseEtude;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/filiere-bourse-formation")
public class FiliereBourseEtudeApi {


//	@Autowired
//	private FiliereBourseEtudeDao FiliereBourseEtudeDao;
	
	@Autowired
	private FiliereBourseEtudeDao filiereBourseEtudeDao;


	@GetMapping(value = "/list")
	public List<FiliereBourseEtude> getFiliereBourseEtudes() {
		return filiereBourseEtudeDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public FiliereBourseEtude save(@RequestBody FiliereBourseEtude filiereBourseEtude) {

//		aomainePTF.setCreateBy();
		return	filiereBourseEtudeDao.saveAndFlush(filiereBourseEtude);
	}

	@PostMapping(value = "/delete")
	public FiliereBourseEtude delete(@RequestBody FiliereBourseEtude filiereBourseEtude) {

		filiereBourseEtude.setStatus(true);
		
		return	filiereBourseEtudeDao.saveAndFlush(filiereBourseEtude);
	}

	@GetMapping(value = "/get/{id}")
	public FiliereBourseEtude getById(@PathVariable("id") Long id) {
		return filiereBourseEtudeDao.findById(id).get();
	}

}
