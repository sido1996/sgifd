package com.sgifdbackend.demo.ide.api;

import com.sgifdbackend.demo.fondspecifique.entities.FondSpecifique;
import com.sgifdbackend.demo.ide.dao.IdeDao;
import com.sgifdbackend.demo.ide.dao.PrevisionRealisationIdeDao;
import com.sgifdbackend.demo.ide.entites.Ide;
import com.sgifdbackend.demo.ide.entites.PrevisionRealisationIde;
import com.sgifdbackend.demo.parametrage.entites.DBFile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/ide")
public class IdeApi {

	@Autowired
	private IdeDao ideDao;

	@Autowired
	private PrevisionRealisationIdeDao previsionRealisationIdeDao;


	@GetMapping(value = "/list")
	public List<Ide> getIdes() {
		return ideDao.findByStatus(false);
	}
	
	@GetMapping(value = "/detail/{id}")
	public Ide getIde(@PathVariable Long id) {
		return ideDao.findById(id).get();
	}

	@PostMapping(value = "/save")
	public Ide save(@RequestBody Ide ide) {
		Ide unide = ideDao.saveAndFlush(ide);
		List<PrevisionRealisationIde> listprevisions = ide.getPrevisionRealisationIdes();
		for(int i=0; i<listprevisions.size(); i++) {
			listprevisions.get(i).setIde(unide);
			previsionRealisationIdeDao.saveAndFlush(listprevisions.get(i));
		}
		return	unide;
	}

	
	@PostMapping(value = "/delete")
	public Ide delete(@RequestBody Ide Ide) {

		Ide.setStatus(true);
		return	ideDao.saveAndFlush(Ide);
	}

	
	@PostMapping(value = "/save-file/{id}")
	public Ide saveFile(@PathVariable("id") Long id, @RequestBody DBFile dBFile) {
		Ide ide = ideDao.findById(id).get();
		ide.getFiles().add(dBFile);
		dBFile.setIde(ide);

		return	ideDao.saveAndFlush(ide);
	}

}
