package com.sgifdbackend.demo.security.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.enums.FonctionnaliteName;
import com.sgifdbackend.demo.enums.ModuleName;
import com.sgifdbackend.demo.security.dao.ModuleUserRepository;
import com.sgifdbackend.demo.security.dao.RoleRepository;
import com.sgifdbackend.demo.security.entities.FonctionnaliteUser;
import com.sgifdbackend.demo.security.entities.ModuleUser;
import com.sgifdbackend.demo.security.entities.Role;

import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/module-user")
public class ModuleUserApi {

	@Autowired
	private ModuleUserRepository moduleUserDao;

	@GetMapping(value = "/list")
	public List<ModuleUser> getAppRoles() {
		return moduleUserDao.findByStatus(false);
	}

	@PostMapping(value = "/save")
	public ModuleUser save(@RequestBody ModuleUser moduleUser) {

		return	moduleUserDao.saveAndFlush(moduleUser);
	}

	@GetMapping(value = "/save-all")
	public List<ModuleUser> saveAll() {
		List<ModuleUser> moduleUsers = new ArrayList<>();
		ModuleUser m ;
        for(ModuleName modul : ModuleName.values()) {
        	m = new ModuleUser(modul);
        	moduleUsers.add(m);
        }
		return	moduleUserDao.saveAll(moduleUsers);
	}

	@PostMapping(value = "/delete")
	public ModuleUser delete(@RequestBody ModuleUser moduleUser) {
		moduleUserDao.delete(moduleUser);
		return	moduleUser;
	}

	@GetMapping(value = "/delete-all")
	public ModuleUser deleteAll() {
		moduleUserDao.deleteAll();
		return	null;
	}

}
