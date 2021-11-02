package com.sgifdbackend.demo.admin_structure_externe.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgifdbackend.demo.cooperationdecentralisee.dao.CooperationDecentraliseeDao;
import com.sgifdbackend.demo.cooperationdecentralisee.entities.CooperationDecentralisee;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.security.CurrentUser;
import com.sgifdbackend.demo.security.UserPrincipal;
import com.sgifdbackend.demo.security.dao.UserRepository;
import com.sgifdbackend.demo.security.entities.User;
@RestController
@CrossOrigin("*")
@RequestMapping("/cooperation-decentralisee/structure")
public class AdminStructureExterneCooperationDecentralisationApi {
	@Autowired
	private CooperationDecentraliseeDao cooperationdecentraliseeDao;
	
	@Autowired
    UserRepository userRepository;
	
	@GetMapping(value = "/list")
	public List<CooperationDecentralisee> getcooperationdecentralisees(@CurrentUser UserPrincipal currentUser) {
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		return cooperationdecentraliseeDao.findByStatusAndStructureBeneficiaire_id(false, meUser.get().getStructureBeneficiaire().getId());
	}

	@PostMapping(value = "/save")
	public CooperationDecentralisee save(@RequestBody CooperationDecentralisee cooperationdecentralisee) {

//		cooperationdecentralisee.setCreateBy();
		return	cooperationdecentraliseeDao.saveAndFlush(cooperationdecentralisee);
	}

	@PostMapping(value = "/delete")
	public CooperationDecentralisee delete(@RequestBody CooperationDecentralisee cooperationdecentralisee) {

		cooperationdecentralisee.setStatus(true);
		return	cooperationdecentraliseeDao.saveAndFlush(cooperationdecentralisee);
	}

	@GetMapping(value="/detail/{id}")
	public CooperationDecentralisee getById(@PathVariable("id") Long id) {

		return	cooperationdecentraliseeDao.findById(id).get();
	}
	
	@PostMapping(value = "/save-file/{id}")
	public CooperationDecentralisee saveFile(@PathVariable("id") Long id, @RequestBody DBFile dBFile) {
		CooperationDecentralisee cooperationDecentralisee = cooperationdecentraliseeDao.findById(id).get();
		cooperationDecentralisee.getFiles().add(dBFile);
		dBFile.setCooperationDecentralisee(cooperationDecentralisee);

		return	cooperationdecentraliseeDao.saveAndFlush(cooperationDecentralisee);
	}
}
