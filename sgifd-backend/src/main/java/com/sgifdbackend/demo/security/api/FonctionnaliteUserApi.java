package com.sgifdbackend.demo.security.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.enums.FonctionnaliteName;
import com.sgifdbackend.demo.security.dao.FonctionnaliteUserRepository;
import com.sgifdbackend.demo.security.entities.FonctionnaliteUser;

import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/fonctionnalite-user")
public class FonctionnaliteUserApi {

	@Autowired
	private FonctionnaliteUserRepository fonctionnaliteUserDao;

	@GetMapping(value = "/list")
	public List<FonctionnaliteUser> getAppRoles() {
		return fonctionnaliteUserDao.findByStatus(false);
	}

	@GetMapping(value = "/save-all")
	public List<FonctionnaliteUser> saveAll() {
		List<FonctionnaliteUser> fonctionnaliteNames = new ArrayList<>();
		FonctionnaliteUser f ;
        for(FonctionnaliteName fonct : FonctionnaliteName.values()) {
        	f = new FonctionnaliteUser(fonct);
        	fonctionnaliteNames.add(f);
        }
		return	fonctionnaliteUserDao.saveAll(fonctionnaliteNames);
	}

	@PostMapping(value = "/save")
	public FonctionnaliteUser save(@RequestBody FonctionnaliteUser fonctionnaliteUser) {

		return	fonctionnaliteUserDao.saveAndFlush(fonctionnaliteUser);
	}

	@PostMapping(value = "/delete")
	public FonctionnaliteUser delete(@RequestBody FonctionnaliteUser fonctionnaliteUser) {
		fonctionnaliteUserDao.delete(fonctionnaliteUser);
		return	fonctionnaliteUser;
	}


	@GetMapping(value = "/delete-all")
	public FonctionnaliteUser deleteAll() {
		fonctionnaliteUserDao.deleteAll();
		return	null;
	}

}
