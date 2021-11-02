package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.DomaineActiviteDao;
import com.sgifdbackend.demo.parametrage.dao.StructureBeneficiaireDao;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.SousSecteur;
import com.sgifdbackend.demo.parametrage.entites.StructureBeneficiaire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/structure")
public class StructureBeneficiaireApi {


//	@Autowired
//	private structureBeneficiaireDao structureBeneficiaireDao;
	
	@Autowired
	private StructureBeneficiaireDao structureBeneficiaireDao;
	
	@Autowired
	private DomaineActiviteDao domaineActiviteDao;

	@GetMapping(value = "/list")
	public List<StructureBeneficiaire> getStructureBeneficiaires() {
		return structureBeneficiaireDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public StructureBeneficiaire save(@RequestBody StructureBeneficiaire structureBeneficiaire) {
	
//		structureBeneficiaire.setCreateBy();
		return	structureBeneficiaireDao.saveAndFlush(structureBeneficiaire);
	}

	@PostMapping(value = "/delete")
	public StructureBeneficiaire delete(@RequestBody StructureBeneficiaire StructureBeneficiaire) {

		StructureBeneficiaire.setStatus(true);
		return	structureBeneficiaireDao.saveAndFlush(StructureBeneficiaire);
	}

	@GetMapping(value = "/get/{id}")
	public StructureBeneficiaire getById(@PathVariable("id") Long id) {
		return structureBeneficiaireDao.findById(id).get();
	}

}
