package com.sgifdbackend.demo.fondspecifique.api;

import com.sgifdbackend.demo.fondspecifique.dao.DetailFondSpecifiqueDao;
import com.sgifdbackend.demo.fondspecifique.dao.FondSpecifiqueDao;
import com.sgifdbackend.demo.fondspecifique.entities.DetailFondSpecifique;
import com.sgifdbackend.demo.fondspecifique.entities.FondSpecifique;
import com.sgifdbackend.demo.ide.dao.IdeDao;
import com.sgifdbackend.demo.ide.entites.Ide;
import com.sgifdbackend.demo.ide.entites.PrevisionRealisationIde;
import com.sgifdbackend.demo.parametrage.entites.DBFile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/fond-specifique")
public class FondSpecifiqueApi {

	@Autowired
	private FondSpecifiqueDao fondSpecifiqueDao;

	@Autowired
	private DetailFondSpecifiqueDao detailFondSpecifiqueDao;

	@GetMapping(value = "/list")
	public List<FondSpecifique> getFondSpecifiques() {
		return fondSpecifiqueDao.findByStatus(false);
	}
	
	@GetMapping(value = "/detail/{id}")
	public FondSpecifique getIde(@PathVariable Long id) {
		return fondSpecifiqueDao.findById(id).get();
	}

	@PostMapping(value = "/save")
	public FondSpecifique save(@RequestBody FondSpecifique fondSpecifique) {
		FondSpecifique unfondSpecifique = fondSpecifiqueDao.saveAndFlush(fondSpecifique);
		
		List<DetailFondSpecifique> detailfondspecifiques = fondSpecifique.getDetailFondSpecifiques();
		for(int i=0; i<detailfondspecifiques.size(); i++) {
			detailfondspecifiques.get(i).setFondSpecifique(unfondSpecifique);
			detailFondSpecifiqueDao.saveAndFlush(detailfondspecifiques.get(i));
		}
			
	   return	fondSpecifique;
	}

	@PostMapping(value = "/delete")
	public FondSpecifique delete(@RequestBody FondSpecifique fondSpecifique) {

		fondSpecifique.setStatus(true);
		return	fondSpecifiqueDao.saveAndFlush(fondSpecifique);
	}
	
	
	@PostMapping(value = "/save-file/{id}")
	public FondSpecifique saveFile(@PathVariable("id") Long id, @RequestBody DBFile dBFile) {
		FondSpecifique fondSpecifique = fondSpecifiqueDao.findById(id).get();
		fondSpecifique.getFiles().add(dBFile);
		dBFile.setFondSpecifique(fondSpecifique);

		return	fondSpecifiqueDao.saveAndFlush(fondSpecifique);
	}


}
