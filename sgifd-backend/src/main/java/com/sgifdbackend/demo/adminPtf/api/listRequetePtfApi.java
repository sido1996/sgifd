package com.sgifdbackend.demo.adminPtf.api;

import com.sgifdbackend.demo.parametrage.dao.ProjetProgrammeIdeeDao;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.payload.RessourceExeterieureRequest;
import com.sgifdbackend.demo.projet.dao.RessourceExterieureDao;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.requetefinancement.dao.RequeteFinancementDao;
import com.sgifdbackend.demo.requetefinancement.entities.RequeteFinancement;
import com.sgifdbackend.demo.security.CurrentUser;
import com.sgifdbackend.demo.security.UserPrincipal;
import com.sgifdbackend.demo.security.dao.UserRepository;
import com.sgifdbackend.demo.security.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin-ptf")
public class listRequetePtfApi {

    @Autowired
    private RessourceExterieureDao ressourceExterieureRequeteDao;

    @Autowired
    private ProjetProgrammeIdeeDao projetProgrammeIdeeDao;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private RequeteFinancementDao requeteFinancementDao;

    @Autowired
    private RessourceExterieureDao ressourceExterieureDao;

    /* les utilisés */

    // liste ressources extérieurs en cours (new)
    @GetMapping(value = "/list-requete-ptf")
    public List<RessourceExterieure> getListRessourcesEncoursByPtfId(@CurrentUser UserPrincipal currentUser) {
        java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
        if (meUser.get().getPtf() != null) {
            return ressourceExterieureDao.findByPtfBailleurFrs_IdAndIsStatusCloseAndRequeteFinancement_IdIsNotNull(
                    meUser.get().getPtf().getId(), false);
        } else {
            return new ArrayList<RessourceExterieure>();
        }
    }

    // liste ressources extérieurs en cloturés (new)
    @GetMapping(value = "/list-requete-clotures-ptf")
    public List<RessourceExterieure> getListRessourcesCloturesByPtfId(@CurrentUser UserPrincipal currentUser) {
        java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
        if (meUser.get().getPtf() != null) {
            return ressourceExterieureDao.findByPtfBailleurFrs_IdAndIsStatusCloseAndRequeteFinancement_IdIsNotNull(
                    meUser.get().getPtf().getId(), true);
        } else {
            return new ArrayList<RessourceExterieure>();
        }
    }

    // liste projet financés annuel
    @GetMapping(value = "/liste-projets-finances-annuel")
    public List<Object> listeProjetsFinancesAnnuel(@RequestParam(name = "id", defaultValue = "") Long id,
                                                   @CurrentUser UserPrincipal currentUser) {
        java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
        if (meUser.get().getPtf() != null) {
            return ressourceExterieureRequeteDao.listProjetsFinancesAnnuel(meUser.get().getPtf().getId(), id);
        } else {
            return new ArrayList<Object>();
        }
    }

    // liste projet financés
    @GetMapping(value = "/liste-projets-finances")
    public List<Object> listeProjetsFinances(@CurrentUser UserPrincipal currentUser) {
        java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
        if (meUser.get().getPtf() != null) {
            return ressourceExterieureRequeteDao.listProjetsFinances(meUser.get().getPtf().getId());
        } else {
            return new ArrayList<Object>();
        }
    }

    // nombre projets financés
    @GetMapping(value = "/nombre-projets-finances")
    public List<Object> nombreProjetsFinances(@CurrentUser UserPrincipal currentUser) {
        java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
        if (meUser.get().getPtf() != null) {
            return ressourceExterieureRequeteDao.nombreProjetsFinances(meUser.get().getPtf().getId());
        } else {
            return new ArrayList<Object>();
        }
    }

    // liste financement annuelle projet
    @GetMapping(value = "/liste-financement-annuelle-projet")
    public List<Object> listFinancementAnnuelProjet(@RequestParam(name = "id", defaultValue = "") Long id,
                                                    @CurrentUser UserPrincipal currentUser) {
        java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
        if (meUser.get().getPtf() != null) {
            return ressourceExterieureRequeteDao.listFinancementAnnuelProjet(meUser.get().getPtf().getId(), id);
        } else {
            return new ArrayList<Object>();
        }
    }

    // liste financement projet
    @GetMapping(value = "/liste-financement-projet")
    public List<Object> listFinancementProjet(@CurrentUser UserPrincipal currentUser) {
        java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
        if (meUser.get().getPtf() != null) {
            System.out.println(" ptf user =======>" + meUser.get().getPtf().getId());
            return ressourceExterieureRequeteDao.listFinancementProjet(meUser.get().getPtf().getId());
        } else {
            return new ArrayList<Object>();
        }
    }

    // detail pour requete encours et cloturées
    @RequestMapping(value = "/detail-all/{id}", method = RequestMethod.GET)
    public RessourceExeterieureRequest getAllById(@PathVariable("id") Long id) {
        RessourceExterieure ressourceExterieure = ressourceExterieureDao.findById(id).get();
        RessourceExeterieureRequest ressourceExeterieureRequest = new RessourceExeterieureRequest();
        ressourceExeterieureRequest.setProjetProgrammeIdee(ressourceExterieure.getProjetProgrammeIdee());
        ressourceExeterieureRequest.setRessourceExterieure(ressourceExterieure);
        ressourceExeterieureRequest
                .setRessourceExterieureAnnuelles(ressourceExterieure.getRessourceExterieureAnnuelles());
        ressourceExeterieureRequest.setRequeteFinancement(ressourceExterieure.getRequeteFinancement());

        return ressourceExeterieureRequest;
    }

    // detail projet financés
    @RequestMapping(value = "/detail-projet-ptf/{id}", method = RequestMethod.GET)
    public ProjetProgrammeIdee getProjetById(@PathVariable("id") Long id, @CurrentUser UserPrincipal currentUser) {
        java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());

        if (projetProgrammeIdeeDao.findById(id).isPresent()) {
            System.out.println("begin finding project");
            ProjetProgrammeIdee projetProgrammeIdee = projetProgrammeIdeeDao.findById(id).get();
            System.out.println(" id projet ===> " + projetProgrammeIdee.getId());
            if (projetProgrammeIdee != null && meUser.isPresent() && projetProgrammeIdee.getRessourceExterieures() != null) {
                System.out.println("id user ===> " + meUser.get().getId());
                System.out.println("id ptf ===> " + meUser.get().getPtf().getId());
			/*	projetProgrammeIdee.getRessourceExterieures().forEach(r -> {
					if (r.getPtfBailleurFrs() != null) {
						if (r.getPtfBailleurFrs().getId() != meUser.get().getPtf().getId())
							projetProgrammeIdee.getRessourceExterieures().remove(r);
					}
				});*/
                for (int i = 0; i < projetProgrammeIdee.getRessourceExterieures().size(); i++) {
					if (projetProgrammeIdee.getRessourceExterieures().get(i).getPtfBailleurFrs() != null) {
						if (projetProgrammeIdee.getRessourceExterieures().get(i).getPtfBailleurFrs().getId() != meUser.get().getPtf().getId())
							projetProgrammeIdee.getRessourceExterieures().remove(projetProgrammeIdee.getRessourceExterieures().get(i));
					}
                }
            }
            return projetProgrammeIdee;
        }
        return null;
    }

    // detail projet financés
    @RequestMapping(value = "/detail-projet-ptf-by-ressource/{id}", method = RequestMethod.GET)
    public RequeteFinancement getProjetByIdRessource(@PathVariable("id") Long id) {
        RessourceExterieure ressourceExterieure = ressourceExterieureDao.findById(id).get();
        System.out.println("id ressource ===> " + ressourceExterieure.getId());
        RequeteFinancement requeteFinancement = null;
        if (ressourceExterieure != null && ressourceExterieure.getRequeteFinancement() != null) {
            requeteFinancement = ressourceExterieure.getRequeteFinancement();
            System.out.println("id projet ===> " + requeteFinancement.getId());
        }

        return requeteFinancement;
    }

    // Enregistrement nouveau projet
    @PostMapping(value = "/save")
    public ProjetProgrammeIdee save(@RequestBody ProjetProgrammeIdee projetProgrammeIdee,
                                    @CurrentUser UserPrincipal currentUser) {
        java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
        projetProgrammeIdee.setValide(true);
        System.out.println("projet  ===>" + projetProgrammeIdee.toString());
        ProjetProgrammeIdee projet = projetProgrammeIdeeDao.saveAndFlush(projetProgrammeIdee);
        // List<RessourceExterieure> ressources =
        // projetProgrammeIdee.getRessourceExterieures();
        List<RessourceExterieure> ressources = projetProgrammeIdee.getRessourceExterieures();

        ressources.forEach(res -> {
            res.setProjetProgrammeIdee(projet);
            res.setPtfBailleurFrs(meUser.get().getPtf());
            res.setIsStatusClose(true);
            ressourceExterieureDao.saveAndFlush(res);
        });

        return projet;

    }

    // rechercher projet par sa reference (en le dépouillant des autres Re)
    @RequestMapping(value = "/projet-by-ref/{ref}", method = RequestMethod.GET)
    public ProjetProgrammeIdee getProjetByRef(@PathVariable("ref") String ref, @CurrentUser UserPrincipal currentUser) {
        java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
        ProjetProgrammeIdee projetProgrammeIdee = projetProgrammeIdeeDao
                .findByStatusAndIsValideAndIsCloseAndReference(false, true, false, ref);

        /*
         * projetProgrammeIdee.getRessourceExterieures().removeIf(r ->
         * r.getPtfBailleurFrs().getId() != meUser.get().getPtf().getId());
         */

        if (projetProgrammeIdee != null) {

            projetProgrammeIdee.getRessourceExterieures().forEach(r -> {
//			System.out.println("id ptf ===>"+r.getPtfBailleurFrs().getId());
                if (r.getPtfBailleurFrs() != null) {
                    if (r.getPtfBailleurFrs().getId() != meUser.get().getPtf().getId())
                        projetProgrammeIdee.getRessourceExterieures().remove(r);
                }
            });

        }

        return projetProgrammeIdee;
    }

    /* les non utilisés */

    @GetMapping(value = "/list-requete-ptf-Encours")
    public List<Object> getRequetePtfEncours(@RequestParam(name = "id", defaultValue = "") Long id) {
        return ressourceExterieureRequeteDao.listRequetesEncours(id);
    }

    @GetMapping(value = "/list-requete-ptf-Clotures")
    public List<Object> getRequetePtfClotures(@RequestParam(name = "id", defaultValue = "") Long id) {
        return ressourceExterieureRequeteDao.listRequetesClotures(id);
    }

    @GetMapping(value = "/detail-ressource/{id}")
    public RessourceExterieure getById(@PathVariable("id") Long id) {

        return ressourceExterieureRequeteDao.findById(id).get();
    }

    @GetMapping(value = "/detail-requeteFinancement/{idP}")
    public RequeteFinancement getRequeteByIdP(@PathVariable("idP") Long idP) {

        return requeteFinancementDao.findByProjetProgrammeIdee_id(idP);
    }

    @GetMapping(value = "/list-projet-finances")
    public List<ProjetProgrammeIdee> getProjetFinances() {

        return ressourceExterieureRequeteDao.listProjetFinances();

    }

    @GetMapping(value = "/list-requete-Encours")
    public List<RessourceExterieure> getRequeteEncoursAdressePtf(
            @RequestParam(name = "id", defaultValue = "") Long id) {
        return ressourceExterieureRequeteDao.listRessourceExterieureEncours(id);
    }

    @GetMapping(value = "/list-requete-Clotures/{id}")
    public List<RessourceExterieure> getRequeteCloturesAdressePtf(
            @RequestParam(name = "id", defaultValue = "") Long id) {
        return ressourceExterieureRequeteDao.listRessourceExterieureClotures(id);
    }

    @GetMapping(value = "/detail-projet/{idP}")
    public ProjetProgrammeIdee getByIdP(@PathVariable("idP") Long idP) {

        return projetProgrammeIdeeDao.findById(idP).get();
    }

    /*
     * @GetMapping(value="/detail-projet-requete/{id}") public ProjetProgrammeIdee
     * getProjetByIdRessourceExterieur(@PathVariable("id") Long id) {
     * RessourceExterieure r = this.getById(id);
     *
     * return r.getProjetProgrammeIdee(); }
     */

    /*
     * @GetMapping(value="/list-projet-finances") public List<ProjetProgrammeIdee>
     * getProjetFinances(@RequestParam(name="id",defaultValue="") Long id) {
     *
     * return ressourceExterieureRequeteDao.listProjetFinances(id); }
     */

}
