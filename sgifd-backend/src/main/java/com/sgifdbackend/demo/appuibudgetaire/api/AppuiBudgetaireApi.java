package com.sgifdbackend.demo.appuibudgetaire.api;

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

@RestController
@CrossOrigin("*")
@RequestMapping("/appui-budgetaire")
public class AppuiBudgetaireApi {
	@Autowired
	private AppuiBudgetaireDao appuiBudgetaireDao;
	
	@Autowired
	private NatureAssistanceDao natureAssistanceDao;
	
	private EnumNatureAssistance enumNature = new EnumNatureAssistance();
	
	@GetMapping(value = "/list/{id}")
	public List<AppuiBudgetaire> getAppuiBudgetaires(@PathVariable Long id) {
		return appuiBudgetaireDao.findByStatusAndAnnee_Id(false, id);
	}

	
	@PostMapping(value = "/save")
	public AppuiBudgetaire save(@RequestBody AppuiBudgetaire appuibudgetaire) {
		System.out.println(appuibudgetaire);
		NatureAssistance nature = natureAssistanceDao.findById(enumNature.id_APPUI_BUDGETAIRE()).get();
		appuibudgetaire.setNatureAssistance(nature);
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
	
	@PostMapping(value = "/save-file/{id}")
	public AppuiBudgetaire saveFile(@PathVariable("id") Long id, @RequestBody DBFile dBFile) {
		AppuiBudgetaire appuiBudgetaire = appuiBudgetaireDao.findById(id).get();
		appuiBudgetaire.getFiles().add(dBFile);
		dBFile.setAppuibudgetaire(appuiBudgetaire);

		return	appuiBudgetaireDao.saveAndFlush(appuiBudgetaire);
	}

}
