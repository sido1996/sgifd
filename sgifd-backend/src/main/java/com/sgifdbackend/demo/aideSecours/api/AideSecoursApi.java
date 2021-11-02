package com.sgifdbackend.demo.aideSecours.api;

import com.sgifdbackend.demo.aideSecours.dao.AideSecoursDao;
import com.sgifdbackend.demo.aideSecours.dao.NatureAideAlimentaireDetailDao;
import com.sgifdbackend.demo.aideSecours.entites.AideAlimentaire;
import com.sgifdbackend.demo.aideSecours.entites.AideSecours;
import com.sgifdbackend.demo.aideSecours.entites.BourseFormation;
import com.sgifdbackend.demo.aideSecours.entites.NatureAideAlimentaireDetail;
import com.sgifdbackend.demo.entitiesBase.EnumNatureAssistance;
import com.sgifdbackend.demo.parametrage.dao.NatureAssistanceDao;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.parametrage.entites.NatureAssistance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/aide-secours")
public class AideSecoursApi {
    private EnumNatureAssistance enumNature = new EnumNatureAssistance();

    @Autowired
    private AideSecoursDao aideSecoursDao;

    @Autowired
    private NatureAssistanceDao natureAssistanceDao;

    @Autowired
    private NatureAideAlimentaireDetailDao natureAideAlimentaireDetailDao;

    @GetMapping(value = "/list")
    public List<BourseFormation> getBourseFormation() {
        return aideSecoursDao.findBourseFormationByStatus(false);
    }

    @GetMapping(value = "/list-aides-alimentaires")
    public List<AideAlimentaire> getAideAlimentaire() {
        return aideSecoursDao.findAideAlimentaireByStatus(false);
    }

    @GetMapping(value = "/detail-aide-alimentaire/{id}")
    public AideAlimentaire getAideAlimentaire(@PathVariable Long id) {
        return aideSecoursDao.findAideAideAlimentaireById(id);
    }

    @GetMapping(value = "/detail-bourse/{id}")
    public BourseFormation getAideBourseFormation(@PathVariable Long id) {
        return aideSecoursDao.findAideBourseFormationById(id);
    }

    @PostMapping(value = "/save")
    public BourseFormation save(@RequestBody BourseFormation bourseFormation) {
        NatureAssistance nature = natureAssistanceDao.findById(enumNature.id_AIDE_SECOURS()).get();
        bourseFormation.setNatureAssistance(nature);
        return aideSecoursDao.saveAndFlush(bourseFormation);

    }

    @PostMapping(value = "/save-aide-alimentaire")
    public AideAlimentaire saveAide(@RequestBody AideAlimentaire aideAlimentaire) {
        List<NatureAideAlimentaireDetail> natureAideAlimentaireDetails = aideAlimentaire.getNatureAideAlimentaireDetails();
        System.out.println(" Taille ===> " + natureAideAlimentaireDetails.size());
        NatureAssistance nature = natureAssistanceDao.findById(enumNature.id_AIDE_ALIMENTAIRE()).get();
        aideAlimentaire.setNatureAssistance(nature);
        AideAlimentaire aideAlimentaireSaved = aideSecoursDao.saveAndFlush(aideAlimentaire);

        for (int i = 0; i < natureAideAlimentaireDetails.size(); i++) {
			natureAideAlimentaireDetails.get(i).setAideAlimentaire(aideAlimentaireSaved);
            natureAideAlimentaireDetailDao.saveAndFlush(natureAideAlimentaireDetails.get(i));
        }
        return aideAlimentaireSaved;

    }

    @PostMapping(value = "/delete-aide-alimentaire")
    public AideAlimentaire deleteAideAlimentaire(@RequestBody AideAlimentaire aideSecours) {

        aideSecours.setStatus(true);
        return aideSecoursDao.saveAndFlush(aideSecours);
    }

    @PostMapping(value = "/delete")
    public BourseFormation delete(@RequestBody BourseFormation aideSecours) {

        aideSecours.setStatus(true);
        return aideSecoursDao.saveAndFlush(aideSecours);
    }

    @PostMapping(value = "/save-file/{id}")
    public AideSecours saveFileAideAlim(@PathVariable("id") Long id, @RequestBody DBFile dBFile) {
        AideSecours ideSecours = aideSecoursDao.findById(id).get();
        ideSecours.getFiles().add(dBFile);
        dBFile.setAideSecours(ideSecours);

        return aideSecoursDao.saveAndFlush(ideSecours);
    }

}
