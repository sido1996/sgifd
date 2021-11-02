package com.sgifdbackend.demo.security.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.security.dao.AccreditatedUserRepository;
import com.sgifdbackend.demo.security.dao.FonctionnaliteUserRepository;
import com.sgifdbackend.demo.security.entities.AccreditatedUser;
import com.sgifdbackend.demo.security.entities.FonctionnaliteUser;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/accreditated-user")
public class AccreditatedUserApi {

	@Autowired
	private AccreditatedUserRepository accreditatedUserDao;

	@GetMapping(value = "/list")
	public List<AccreditatedUser> getAppRoles() {
		return accreditatedUserDao.findByStatus(false);
	}

	@PostMapping(value = "/save")
	public AccreditatedUser save(@RequestBody AccreditatedUser accreditatedUser) {

		return	accreditatedUserDao.saveAndFlush(accreditatedUser);
	}

	@PostMapping(value = "/delete")
	public AccreditatedUser delete(@RequestBody AccreditatedUser accreditatedUser) {
		accreditatedUserDao.delete(accreditatedUser);
		return	accreditatedUser;
	}


}
