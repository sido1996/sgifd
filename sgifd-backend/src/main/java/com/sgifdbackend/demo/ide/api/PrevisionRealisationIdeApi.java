package com.sgifdbackend.demo.ide.api;

import com.sgifdbackend.demo.ide.dao.IdeDao;
import com.sgifdbackend.demo.ide.dao.PrevisionRealisationIdeDao;
import com.sgifdbackend.demo.ide.entites.PrevisionRealisationIde;
import com.sgifdbackend.demo.parametrage.dao.CategoriePTFDao;
import com.sgifdbackend.demo.parametrage.entites.CategoriePTF;
import com.sgifdbackend.demo.parametrage.entites.CategorieProjet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/prevision-realisation-ide")
public class PrevisionRealisationIdeApi {


//	@Autowired
//	private categoriePTFDao categoriePTFDao;
	
	@Autowired
	private PrevisionRealisationIdeDao previsionRealisationIdeDao;

	@Autowired
	private IdeDao ideDao;

	@GetMapping(value = "/list/{id}")
	public List<PrevisionRealisationIde> getPrevisions(@PathVariable("id") Long id) {
		return previsionRealisationIdeDao.findByStatusAndIde(false, ideDao.findById(id).get());
	}

	@PostMapping(value = "/delete")
	public PrevisionRealisationIde delete(@RequestBody PrevisionRealisationIde previsionRealisationIde) {

		previsionRealisationIdeDao.delete(previsionRealisationIde);
		return	previsionRealisationIde;
	}
	
}
