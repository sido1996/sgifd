package com.sgifdbackend.demo.admin_structure_externe.api;

import java.util.List;

import com.sgifdbackend.demo.aideSecours.dao.NatureAideAlimentaireDetailDao;
import com.sgifdbackend.demo.aideSecours.entites.NatureAideAlimentaireDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgifdbackend.demo.aideSecours.dao.AideSecoursDao;
import com.sgifdbackend.demo.aideSecours.entites.AideAlimentaire;
import com.sgifdbackend.demo.aideSecours.entites.AideSecours;
import com.sgifdbackend.demo.aideSecours.entites.BourseFormation;
import com.sgifdbackend.demo.entitiesBase.EnumNatureAssistance;
import com.sgifdbackend.demo.parametrage.dao.NatureAssistanceDao;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.parametrage.entites.NatureAssistance;
import com.sgifdbackend.demo.security.CurrentUser;
import com.sgifdbackend.demo.security.UserPrincipal;
import com.sgifdbackend.demo.security.dao.UserRepository;
import com.sgifdbackend.demo.security.entities.User;

@RestController
@CrossOrigin("*")
@RequestMapping("/aide-secours/structure")
public class AdminStructureExterneAideAlimentaireApi {
	private EnumNatureAssistance enumNature = new EnumNatureAssistance();
	
	@Autowired
	private AideSecoursDao aideSecoursDao;
	
	@Autowired
    UserRepository userRepository;
	
	@Autowired
	private NatureAssistanceDao natureAssistanceDao;

	@Autowired
	private NatureAideAlimentaireDetailDao natureAideAlimentaireDetailDao;


	/*@GetMapping(value = "/list-bourse")
	public List<AideAlimentaire> getAideAlimentaire(@CurrentUser UserPrincipal currentUser) {
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		System.out.println("structure_id=====>"+meUser.get().getStructureBeneficiaire().getId());
		return aideSecoursDao.findAideAlimentaireByStatusIsFalseAndInformateur_SourceInformation_Id(meUser.get().getStructureBeneficiaire().getId());
	}
	

	@GetMapping(value = "/list")
	public List<BourseFormation> getBourseFormation(@CurrentUser UserPrincipal currentUser) {
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		return aideSecoursDao.findBourseFormationByStatusIsFalseAndInformateur_SourceInformation_Id(meUser.get().getStructureBeneficiaire().getId());
	}*/
	
	@GetMapping(value = "/list")
	public List<AideAlimentaire> getAideAlimentaire(@CurrentUser UserPrincipal currentUser) {
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		System.out.println("structure_id=====>"+meUser.get().getStructureBeneficiaire().getId());
		return aideSecoursDao.findAideAlimentaireByStatusIsFalseAndInformateur_SourceInformation_Id(meUser.get().getStructureBeneficiaire().getId());
	}
	
	@GetMapping(value = "/list-bourse")
	public List<BourseFormation> getBourseFormation(@CurrentUser UserPrincipal currentUser) {
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		System.out.println("structure_id=====>"+meUser.get().getStructureBeneficiaire().getId());
		return aideSecoursDao.findBourseFormationByStatusIsFalseAndInformateur_SourceInformation_Id(meUser.get().getStructureBeneficiaire().getId());
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
		return	aideSecoursDao.saveAndFlush(bourseFormation);
		 	
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
		return	aideSecoursDao.saveAndFlush(aideAlimentaire);
		
	}

	@PostMapping(value = "/delete-aide-alimentaire")
	public AideAlimentaire deleteAideAlimentaire(@RequestBody AideAlimentaire aideSecours) {

		aideSecours.setStatus(true);
		return	aideSecoursDao.saveAndFlush(aideSecours);
	}
	
	@PostMapping(value = "/delete")
	public BourseFormation delete(@RequestBody BourseFormation aideSecours) {

		aideSecours.setStatus(true);
		return	aideSecoursDao.saveAndFlush(aideSecours);
	}
	
	@PostMapping(value = "/save-file/{id}")
	public AideSecours saveFileAideAlim(@PathVariable("id") Long id, @RequestBody DBFile dBFile) {
		AideSecours ideSecours = aideSecoursDao.findById(id).get();
		ideSecours.getFiles().add(dBFile);
		dBFile.setAideSecours(ideSecours);

		return	aideSecoursDao.saveAndFlush(ideSecours);
	}

}
