package com.sgifdbackend.demo.ppp.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgifdbackend.demo.aideSecours.entites.AideAlimentaire;
import com.sgifdbackend.demo.ide.entites.Ide;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.ppp.dao.ContratPPPDao;
import com.sgifdbackend.demo.ppp.dao.PrevisionRealisationPPPDao;
import com.sgifdbackend.demo.ppp.entites.ContratPPP;
import com.sgifdbackend.demo.ppp.entites.PrevisionRealisationPPP;

@RestController
@CrossOrigin("*")
@RequestMapping("/ppp")
public class ContratPPPApi {
	@Autowired
	private  ContratPPPDao contratPPPDao;

	@Autowired
	private PrevisionRealisationPPPDao previsionRealisationPPPDao;

	@GetMapping(value = "/list")
	public List<ContratPPP> getContratPPPs() {
		return contratPPPDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public ContratPPP save(@RequestBody ContratPPP contratPPP) {

		ContratPPP unContratPPP = contratPPPDao.saveAndFlush(contratPPP);
		
		List<PrevisionRealisationPPP> previsionRealisationPPPs = contratPPP.getPrevisionRealisationPPPs();
		for(int i=0; i<previsionRealisationPPPs.size(); i++) {
			previsionRealisationPPPs.get(i).setContratPPP(unContratPPP);
			previsionRealisationPPPDao.saveAndFlush(previsionRealisationPPPs.get(i));
		}
		
		return	contratPPP;
	}

	
	@PostMapping(value = "/delete")
	public ContratPPP delete(@RequestBody ContratPPP contratPPP) {

		contratPPP.setStatus(true);
		return	contratPPPDao.saveAndFlush(contratPPP);
	}
	
	@GetMapping(value = "/detail/{id}")
	public ContratPPP getContratPPP(@PathVariable Long id) {
		return contratPPPDao.findByStatusIsFalseAndId(id);
	}
	
	@PostMapping(value = "/save-file/{id}")
	public ContratPPP saveFile(@PathVariable("id") Long id, @RequestBody DBFile dBFile) {
		ContratPPP contratPPP = contratPPPDao.findById(id).get();
		contratPPP.getFiles().add(dBFile);
		dBFile.setContratPPP(contratPPP);

		return	contratPPPDao.saveAndFlush(contratPPP);
	}

}
