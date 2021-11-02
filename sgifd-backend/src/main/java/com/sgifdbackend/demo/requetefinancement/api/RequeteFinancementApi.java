package com.sgifdbackend.demo.requetefinancement.api;

import com.sgifdbackend.demo.parametrage.dao.ProjetProgrammeIdeeDao;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.dao.RessourceExterieureDao;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.requetefinancement.dao.InstructionRequeteDao;
import com.sgifdbackend.demo.requetefinancement.dao.RequeteFinancementDao;
import com.sgifdbackend.demo.requetefinancement.entities.InstructionRequete;
import com.sgifdbackend.demo.requetefinancement.entities.RequeteFinancement;
import com.sgifdbackend.demo.security.api.AuthController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/requete-financement")
public class RequeteFinancementApi {


//	@Autowired
//	private requeteFinancementDao requeteFinancementDao;

    @Autowired
    private RequeteFinancementDao requeteFinancementDao;

    @Autowired
    private RessourceExterieureDao ressourceExterieureRequeteDao;

    @Autowired
    private InstructionRequeteDao instructionRequeteDao;

    @Autowired
    private ProjetProgrammeIdeeDao projetProgrammeIdeeDao;

    @Autowired
    private AuthController authController;

    @GetMapping(value = "/list")
    public List<RequeteFinancement> getRequeteFinancements() {
        return requeteFinancementDao.findByStatusAndIsStatusClose(false, false);
    }


    @GetMapping(value = "/list-close")
    public List<RequeteFinancement> getRequeteFinancementsClose() {
        return requeteFinancementDao.findByStatusAndIsStatusClose(false, true);
    }

    @PostMapping(value = "/save")
    public RequeteFinancement save(@RequestBody RequeteFinancement requeteFinancement) {

        List<RessourceExterieure> ressourcesExterieures = requeteFinancement.getRessourceExterieures();

        if (requeteFinancement.getId() == null || requeteFinancement.getId() == 0) {
            requeteFinancement.setIsStatusClose(false);
            requeteFinancement.setDateEnvoiRequete(new Date());
        }
        RequeteFinancement requete = requeteFinancementDao.saveAndFlush(requeteFinancement);

        ProjetProgrammeIdee projetProgrammeIdee = requete.getProjetProgrammeIdee();
        projetProgrammeIdee.setValide(false);
        projetProgrammeIdeeDao.saveAndFlush(projetProgrammeIdee);


        for (int i = 0; i < ressourcesExterieures.size(); i++) {
            ressourcesExterieures.get(i).setRequeteFinancement(requete);
            ressourcesExterieures.get(i).setIsStatusClose(false);
            ressourceExterieureRequeteDao.saveAndFlush(ressourcesExterieures.get(i));
            //envoi de mail
			String helloName = ressourcesExterieures.get(i).getPtfBailleurFrs().getDenominationptf();
			String to = ressourcesExterieures.get(i).getPtfBailleurFrs().getEmailptf();
			String subject = " Notification de requête de financement pour un montant de "+ressourcesExterieures.get(i).getMontantRessourceDevise()+ " "+ressourcesExterieures.get(i).getDeviseMonnaie().getLibelle();
			String messageContent = " Notification de requête de financement pour un montant de "+ressourcesExterieures.get(i).getMontantRessourceDevise()+ " "+ressourcesExterieures.get(i).getDeviseMonnaie().getLibelle()+
					" au sujet du projet intitulé : "+projetProgrammeIdee.getLibelle();
			authController.sendEmailToOnUser(helloName, to, subject, messageContent);
			//fin d'envoi de mail
        }

        return requete;
    }

    @PostMapping(value = "/delete")
    public RequeteFinancement delete(@RequestBody RequeteFinancement RequeteFinancement) {

        RequeteFinancement.setStatus(true);
        return requeteFinancementDao.saveAndFlush(RequeteFinancement);
    }

    @GetMapping(value = "/detail/{id}")
    public RequeteFinancement getById(@PathVariable("id") Long id) {

        return requeteFinancementDao.findById(id).get();
    }

    @PostMapping(value = "/close")
    public RequeteFinancement close(@RequestBody RequeteFinancement requeteFinancement) {
        List<RessourceExterieure> ressourcesExterieures = requeteFinancement.getRessourceExterieures();

        List<InstructionRequete> instructionRequetes = requeteFinancement.getInstructionRequetes();

        requeteFinancement.setIsStatusClose(true);
        requeteFinancement.setDateClose(new Date());
        RequeteFinancement requete = requeteFinancementDao.saveAndFlush(requeteFinancement);

        //activation du projet après cloture de la requête
        ProjetProgrammeIdee projetProgrammeIdee = requete.getProjetProgrammeIdee();
        projetProgrammeIdee.setValide(true);
        projetProgrammeIdee.setClose(false);
        projetProgrammeIdeeDao.saveAndFlush(projetProgrammeIdee);

        for (int i = 0; i < ressourcesExterieures.size(); i++) {
            if (ressourcesExterieures.get(i).getLibelle() == "ABOUTIE") {
                ressourcesExterieures.get(i).setProjetProgrammeIdee(projetProgrammeIdee);
                ressourcesExterieures.get(i).setRequeteFinancement(requete);
                ressourcesExterieures.get(i).setIsStatusClose(true);
                ressourcesExterieures.get(i).setDateCloture(new Date());
                ressourceExterieureRequeteDao.saveAndFlush(ressourcesExterieures.get(i));
            }
        }

        for (int i = 0; i < instructionRequetes.size(); i++) {
            instructionRequetes.get(i).setRequeteFinancement(requete);
            instructionRequeteDao.saveAndFlush(instructionRequetes.get(i));
        }

        return requete;

    }


    @GetMapping(value = "/relancer/{id}")
    public RequeteFinancement relancer(@PathVariable("id") Long id) {
        RequeteFinancement requeteFinancement = requeteFinancementDao.findById(id).get();

        List<RessourceExterieure> ressourcesExterieures = requeteFinancement.getRessourceExterieures();

        requeteFinancement.setIsStatusClose(false);
        requeteFinancement.setDateClose(null);
        requeteFinancement.setTypeAppreciation(null);
        requeteFinancement.setCloseReason(null);

        RequeteFinancement requete = requeteFinancementDao.saveAndFlush(requeteFinancement);

        //désactivation du projet après relance de la requête
        ProjetProgrammeIdee projetProgrammeIdee = requete.getProjetProgrammeIdee();
        projetProgrammeIdee.setValide(false);
        projetProgrammeIdee.setClose(false);
        projetProgrammeIdeeDao.saveAndFlush(projetProgrammeIdee);

        for (int i = 0; i < ressourcesExterieures.size(); i++) {
            ressourcesExterieures.get(i).setProjetProgrammeIdee(null);
            ressourcesExterieures.get(i).setIsStatusClose(false);
            ressourcesExterieures.get(i).setLibelle(null);
            ressourceExterieureRequeteDao.saveAndFlush(ressourcesExterieures.get(i));
        }

        return requete;

    }

    @PostMapping(value = "/save-file/{id}")
    public RequeteFinancement saveFile(@PathVariable("id") Long id, @RequestBody DBFile dBFile) {
        RequeteFinancement requete = requeteFinancementDao.findById(id).get();
        requete.getFiles().add(dBFile);
        dBFile.setRequeteFinancement(requete);

        return requeteFinancementDao.saveAndFlush(requete);
    }

}
