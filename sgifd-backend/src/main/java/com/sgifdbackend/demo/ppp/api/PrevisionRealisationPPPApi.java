package com.sgifdbackend.demo.ppp.api;

import com.sgifdbackend.demo.ide.dao.IdeDao;
import com.sgifdbackend.demo.ide.dao.PrevisionRealisationIdeDao;
import com.sgifdbackend.demo.ide.entites.PrevisionRealisationIde;
import com.sgifdbackend.demo.parametrage.dao.CategoriePTFDao;
import com.sgifdbackend.demo.parametrage.entites.CategoriePTF;
import com.sgifdbackend.demo.parametrage.entites.CategorieProjet;
import com.sgifdbackend.demo.ppp.dao.ContratPPPDao;
import com.sgifdbackend.demo.ppp.dao.PrevisionRealisationPPPDao;
import com.sgifdbackend.demo.ppp.entites.PrevisionRealisationPPP;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/prevision-realisation-ppp")
public class PrevisionRealisationPPPApi {


//	@Autowired
//	private categoriePTFDao categoriePTFDao;
	
	@Autowired
	private PrevisionRealisationPPPDao previsionRealisationPPPDao;

	@Autowired
	private ContratPPPDao contratPPPDao;

	@GetMapping(value = "/list/{id}")
	public List<PrevisionRealisationPPP> getPrevisions(@PathVariable("id") Long id) {
		return previsionRealisationPPPDao.findByStatusAndContratPPP(false, contratPPPDao.findById(id).get());
	}

	@PostMapping(value = "/delete")
	public PrevisionRealisationPPP delete(@RequestBody PrevisionRealisationPPP previsionRealisationPPP) {

		previsionRealisationPPPDao.delete(previsionRealisationPPP);
		return	previsionRealisationPPP;
	}
	
}
