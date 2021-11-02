package com.sgifdbackend.demo.security.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.enums.ActionOfFonctionnaliteName;
import com.sgifdbackend.demo.enums.ModuleName;
import com.sgifdbackend.demo.security.dao.AccreditatedUserRepository;
import com.sgifdbackend.demo.security.dao.ActionOfFonctionnaliteRepository;
import com.sgifdbackend.demo.security.dao.FonctionnaliteUserRepository;
import com.sgifdbackend.demo.security.entities.AccreditatedUser;
import com.sgifdbackend.demo.security.entities.ActionOfFonctionnalite;
import com.sgifdbackend.demo.security.entities.FonctionnaliteUser;
import com.sgifdbackend.demo.security.entities.ModuleUser;

import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/action-of-fonctionnalite-user")
public class ActionOfFonctionnaliteApi {

	@Autowired
	private ActionOfFonctionnaliteRepository actionOfFonctionnaliteDao;

	@GetMapping(value = "/list")
	public List<ActionOfFonctionnalite> getAppRoles() {
		return actionOfFonctionnaliteDao.findByStatus(false);
	}

	@PostMapping(value = "/save")
	public ActionOfFonctionnalite save(@RequestBody ActionOfFonctionnalite actionOfFonctionnalite) {

		return	actionOfFonctionnaliteDao.saveAndFlush(actionOfFonctionnalite);
	}

	@GetMapping(value = "/save-all")
	public List<ActionOfFonctionnalite> saveAll() {
		List<ActionOfFonctionnalite> actionOfFonctionnalites = new ArrayList<>();
		ActionOfFonctionnalite a ;
        for(ActionOfFonctionnaliteName act : ActionOfFonctionnaliteName.values()) {
        	a = new ActionOfFonctionnalite(act);
        	actionOfFonctionnalites.add(a);
        }
		return	actionOfFonctionnaliteDao.saveAll(actionOfFonctionnalites);
	}
	
	@PostMapping(value = "/delete")
	public ActionOfFonctionnalite delete(@RequestBody ActionOfFonctionnalite actionOfFonctionnalite) {
		actionOfFonctionnaliteDao.delete(actionOfFonctionnalite);
		return	actionOfFonctionnalite;
	}


	@GetMapping(value = "/delete-all")
	public ActionOfFonctionnalite deleteAll() {
		actionOfFonctionnaliteDao.deleteAll();
		return	null;
	}
	
}
