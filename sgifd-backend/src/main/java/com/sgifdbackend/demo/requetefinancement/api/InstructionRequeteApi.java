package com.sgifdbackend.demo.requetefinancement.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.projet.dao.RessourceExterieureDao;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.requetefinancement.dao.InstructionRequeteDao;
import com.sgifdbackend.demo.requetefinancement.dao.ReponseRequeteFinancementDao;
import com.sgifdbackend.demo.requetefinancement.dao.RequeteFinancementDao;
import com.sgifdbackend.demo.requetefinancement.entities.InstructionRequete;
import com.sgifdbackend.demo.requetefinancement.entities.RelanceRequeteFinancement;
import com.sgifdbackend.demo.requetefinancement.entities.ReponseRequeteFinancement;
import com.sgifdbackend.demo.requetefinancement.entities.RequeteFinancement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/instruction-requete/requete")
public class InstructionRequeteApi {

	@Autowired
	private RequeteFinancementDao requeteFinancementDao;

	@Autowired
	private InstructionRequeteDao instructionRequeteDao;


	@GetMapping(value = "/list/{id}")
	public List<InstructionRequete> getReponseRequeteFinancements(@PathVariable("id") Long id) {
		RequeteFinancement requeteFinancement = requeteFinancementDao.findById(id).get();
	
		return 	instructionRequeteDao.findByStatusAndRequeteFinancement(false, requeteFinancement);
		
	}

	@PostMapping(value = "/save/{id}")
	public InstructionRequete save(@PathVariable("id") Long id, @RequestBody InstructionRequete instructionRequete) {
		
		RequeteFinancement requeteFinancement = requeteFinancementDao.findById(id).get();
		instructionRequete.setRequeteFinancement(requeteFinancement);
		return	instructionRequeteDao.saveAndFlush(instructionRequete);
	}

	@PostMapping(value = "/delete")
	public InstructionRequete delete(@RequestBody InstructionRequete instructionRequete) {
		instructionRequeteDao.delete(instructionRequete);
		return	instructionRequete;
	}

	@RequestMapping(value="/detail/{id}", method = RequestMethod.GET)
	public InstructionRequete getById(@PathVariable("id") Long id) {

		return	instructionRequeteDao.findById(id).get();
	}

}
