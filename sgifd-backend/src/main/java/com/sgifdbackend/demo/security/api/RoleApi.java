package com.sgifdbackend.demo.security.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sgifdbackend.demo.security.dao.ModuleUserRepository;
import com.sgifdbackend.demo.security.dao.RoleRepository;
import com.sgifdbackend.demo.security.entities.Role;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/role")
public class RoleApi {

	@Autowired
	private RoleRepository roleDao;

	@Autowired
	private ModuleUserRepository moduleUserDao;

	@GetMapping(value = "/list")
	public List<Role> getAppRoles() {
		return roleDao.findByStatus(false);
	}

	@PostMapping(value = "/save")
	public Role save(@RequestBody Role role) {

		return	roleDao.saveAndFlush(role);
	}

	@PostMapping(value = "/delete")
	public Role delete(@RequestBody Role AppRole) {

		AppRole.setStatus(true);
		return	roleDao.saveAndFlush(AppRole);
	}


}
