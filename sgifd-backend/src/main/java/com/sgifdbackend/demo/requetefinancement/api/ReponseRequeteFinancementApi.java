package com.sgifdbackend.demo.requetefinancement.api;

import com.sgifdbackend.demo.security.api.AuthController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.projet.dao.RessourceExterieureDao;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.requetefinancement.dao.ReponseRequeteFinancementDao;
import com.sgifdbackend.demo.requetefinancement.dao.RequeteFinancementDao;
import com.sgifdbackend.demo.requetefinancement.entities.RelanceRequeteFinancement;
import com.sgifdbackend.demo.requetefinancement.entities.ReponseRequeteFinancement;
import com.sgifdbackend.demo.requetefinancement.entities.RequeteFinancement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/requete-financement/reponse")
public class ReponseRequeteFinancementApi {

	@Autowired
	private RessourceExterieureDao ressourceExterieureRequeteDao;

	@Autowired
	private ReponseRequeteFinancementDao reponseRequeteFinancementDao;

	@Autowired
	private AuthController authController;


	@GetMapping(value = "/list/{id}")
	public List<ReponseRequeteFinancement> getReponseRequeteFinancements(@PathVariable("id") Long id) {
		RessourceExterieure ressourceExterieureRequete = ressourceExterieureRequeteDao.findById(id).get();
	
		return 	reponseRequeteFinancementDao.findByStatusAndRessourceExterieure(false, ressourceExterieureRequete);
	}

	@PostMapping(value = "/save/{id}")
	public ReponseRequeteFinancement save(@PathVariable("id") Long id, @RequestBody ReponseRequeteFinancement reponseRequeteFinancement) {
		if (reponseRequeteFinancement.getId() == null || reponseRequeteFinancement.getId() == 0) {
			reponseRequeteFinancement.setDateReponse(new Date());
		}
		RessourceExterieure ressourceExterieureRequete = ressourceExterieureRequeteDao.findById(id).get();
		reponseRequeteFinancement.setRessourceExterieure(ressourceExterieureRequete);

		//envoi de mail
		String helloName = ressourceExterieureRequete.getPtfBailleurFrs().getDenominationptf();
		String to = ressourceExterieureRequete.getPtfBailleurFrs().getEmailptf();
		String subject = " Notification de réponse de financement pour un montant de "+ressourceExterieureRequete.getMontantRessourceDevise()+ " "+ressourceExterieureRequete.getDeviseMonnaie().getLibelle();
		String messageContent = " Notification de réponse de financement pour un montant de "+ressourceExterieureRequete.getMontantRessourceDevise()+ " "+ressourceExterieureRequete.getDeviseMonnaie().getLibelle();
		authController.sendEmailToOnUser(helloName, to, subject, messageContent);
		//fin d'envoi de mail

		return	reponseRequeteFinancementDao.saveAndFlush(reponseRequeteFinancement);
	}

	@PostMapping(value = "/delete")
	public ReponseRequeteFinancement delete(@RequestBody ReponseRequeteFinancement reponseRequeteFinancement) {
		reponseRequeteFinancementDao.delete(reponseRequeteFinancement);
		return	reponseRequeteFinancement;
	}

	@RequestMapping(value="/detail/{id}", method = RequestMethod.GET)
	public ReponseRequeteFinancement getById(@PathVariable("id") Long id) {

		return	reponseRequeteFinancementDao.findById(id).get();
	}

}
