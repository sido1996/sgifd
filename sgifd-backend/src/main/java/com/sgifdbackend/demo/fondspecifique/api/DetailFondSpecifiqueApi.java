package com.sgifdbackend.demo.fondspecifique.api;

import com.sgifdbackend.demo.fondspecifique.dao.DetailFondSpecifiqueDao;
import com.sgifdbackend.demo.fondspecifique.dao.FondSpecifiqueDao;
import com.sgifdbackend.demo.fondspecifique.entities.DetailFondSpecifique;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/detail-fond-specifique")
public class DetailFondSpecifiqueApi {
	
	@Autowired
	private DetailFondSpecifiqueDao detailFondSpecifiqueDao;

	@Autowired
	private FondSpecifiqueDao fondSpecifiqueDao;

	@GetMapping(value = "/list/{id}")
	public List<DetailFondSpecifique> getPrevisions(@PathVariable("id") Long id) {
		return detailFondSpecifiqueDao.findByStatusAndFondSpecifique(false, fondSpecifiqueDao.findById(id).get());
	}

	@PostMapping(value = "/delete")
	public DetailFondSpecifique delete(@RequestBody DetailFondSpecifique detailFondSpecifique) {

		detailFondSpecifiqueDao.delete(detailFondSpecifique);
		return	detailFondSpecifique;
	}
	
}
