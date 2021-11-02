package com.sgifdbackend.demo.adminPtf.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgifdbackend.demo.appuibudgetaire.dao.AppuiBudgetaireDao;
import com.sgifdbackend.demo.appuibudgetaire.entities.AppuiBudgetaire;
import com.sgifdbackend.demo.entitiesBase.EnumNatureAssistance;
import com.sgifdbackend.demo.parametrage.dao.NatureAssistanceDao;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.parametrage.entites.NatureAssistance;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.security.CurrentUser;
import com.sgifdbackend.demo.security.UserPrincipal;
import com.sgifdbackend.demo.security.dao.UserRepository;
import com.sgifdbackend.demo.security.entities.User;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/appui-budgetaire-ptf")
public class listAppuisBudgetairePtfApi {
	@Autowired
	private AppuiBudgetaireDao appuiBudgetaireDao;
	
	@Autowired
	private NatureAssistanceDao natureAssistanceDao;
	
	@Autowired
    UserRepository userRepository;
	
	private EnumNatureAssistance enumNature = new EnumNatureAssistance();
	
	@GetMapping(value = "/list/{id}")
	public List<AppuiBudgetaire> getAppuiBudgetairesAnnuel(@CurrentUser UserPrincipal currentUser, @PathVariable Long id) {		
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		if(meUser.get().getPtf() != null) {
			return appuiBudgetaireDao.findByStatusAndPtfBailleurFrs_IdAndAnnee_Id(false,meUser.get().getPtf().getId(), id);		
		} else {
			return new ArrayList<AppuiBudgetaire>();
		}		
		
	}
	
	
	
	@GetMapping(value = "/list")
	public List<AppuiBudgetaire> getAppuiBudgetairesTotal(@CurrentUser UserPrincipal currentUser) {		
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		if(meUser.get().getPtf() != null) {
			return appuiBudgetaireDao.findByStatusAndPtfBailleurFrs_Id(false,meUser.get().getPtf().getId());		
		} else {
			return new ArrayList<AppuiBudgetaire>();
		}		
		
	}
	
	

	@PostMapping(value = "/save")
	public AppuiBudgetaire save(@RequestBody AppuiBudgetaire appuibudgetaire, @CurrentUser UserPrincipal currentUser) {
		System.out.println(appuibudgetaire);
		
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		
		NatureAssistance nature = natureAssistanceDao.findById(enumNature.id_APPUI_BUDGETAIRE()).get();
		appuibudgetaire.setNatureAssistance(nature);
		appuibudgetaire.setPtfBailleurFrs(meUser.get().getPtf());
		return	appuiBudgetaireDao.saveAndFlush(appuibudgetaire);
	}

	@PostMapping(value = "/delete")
	public AppuiBudgetaire delete(@RequestBody AppuiBudgetaire AppuiBudgetaire) {

		AppuiBudgetaire.setStatus(true);
		return	appuiBudgetaireDao.saveAndFlush(AppuiBudgetaire);
	}

	@GetMapping(value="/detail/{id}")
	public AppuiBudgetaire getById(@PathVariable("id") Long id) {

		return	appuiBudgetaireDao.findById(id).get();
	}
}
