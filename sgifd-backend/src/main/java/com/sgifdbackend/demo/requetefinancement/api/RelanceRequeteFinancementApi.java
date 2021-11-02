package com.sgifdbackend.demo.requetefinancement.api;

import com.sgifdbackend.demo.security.api.AuthController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.projet.dao.RessourceExterieureDao;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.requetefinancement.dao.RelanceRequeteFinancementDao;
import com.sgifdbackend.demo.requetefinancement.dao.RequeteFinancementDao;
import com.sgifdbackend.demo.requetefinancement.entities.RelanceRequeteFinancement;
import com.sgifdbackend.demo.requetefinancement.entities.RequeteFinancement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/requete-financement/relance")
public class RelanceRequeteFinancementApi {

	@Autowired
	private RessourceExterieureDao ressourceExterieureRequeteDao;

	@Autowired
	private RelanceRequeteFinancementDao relanceRequeteFinancementDao;

	@Autowired
	private AuthController authController;

	@GetMapping(value = "/list/{id}")
	public List<RelanceRequeteFinancement> getRelanceRequeteFinancements(@PathVariable("id") Long id) {
		RessourceExterieure ressourceExterieureRequete = ressourceExterieureRequeteDao.findById(id).get();
		return relanceRequeteFinancementDao.findByStatusAndRessourceExterieure(false, ressourceExterieureRequete);
		
	}

	@PostMapping(value = "/save/{id}")
	public RelanceRequeteFinancement save(@PathVariable("id") Long id, @RequestBody RelanceRequeteFinancement relanceRequeteFinancement) {
		if(relanceRequeteFinancement.getId() == null || relanceRequeteFinancement.getId() == 0) {
			relanceRequeteFinancement.setDateRelance(new Date());
		}
		RessourceExterieure ressourceExterieureRequete = ressourceExterieureRequeteDao.findById(id).get();
		relanceRequeteFinancement.setRessourceExterieure(ressourceExterieureRequete);
		//envoi de mail
		String helloName = ressourceExterieureRequete.getPtfBailleurFrs().getDenominationptf();
		String to = ressourceExterieureRequete.getPtfBailleurFrs().getEmailptf();
		String subject = " Notification de relance de financement pour un montant de "+ressourceExterieureRequete.getMontantRessourceDevise()+ " "+ressourceExterieureRequete.getDeviseMonnaie().getLibelle();
		String messageContent = " Notification de relance de financement pour un montant de "+ressourceExterieureRequete.getMontantRessourceDevise()+ " "+ressourceExterieureRequete.getDeviseMonnaie().getLibelle();
		authController.sendEmailToOnUser(helloName, to, subject, messageContent);
		//fin d'envoi de mail

		return	relanceRequeteFinancementDao.saveAndFlush(relanceRequeteFinancement);

	}

	@PostMapping(value = "/delete")
	public RelanceRequeteFinancement delete(@RequestBody RelanceRequeteFinancement relanceRequeteFinancement) {
		relanceRequeteFinancementDao.delete(relanceRequeteFinancement);

		return	relanceRequeteFinancement;
	}

	@RequestMapping(value="/detail/{id}", method = RequestMethod.GET)
	public RelanceRequeteFinancement getById(@PathVariable("id") Long id) {

		return	relanceRequeteFinancementDao.findById(id).get();
	}

}
