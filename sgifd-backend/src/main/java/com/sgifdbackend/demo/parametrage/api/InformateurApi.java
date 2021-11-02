package com.sgifdbackend.demo.parametrage.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgifdbackend.demo.parametrage.dao.InformateurDao;
import com.sgifdbackend.demo.parametrage.entites.Informateur;
import com.sgifdbackend.demo.security.CurrentUser;
import com.sgifdbackend.demo.security.UserPrincipal;
import com.sgifdbackend.demo.security.dao.UserRepository;
import com.sgifdbackend.demo.security.entities.User;


@RestController
@CrossOrigin("*")
@RequestMapping("/informateur")
public class InformateurApi {
	@Autowired
	private InformateurDao informateurDao;
	
	@Autowired
    UserRepository userRepository;
	

	@GetMapping(value = "/list")
	public List<Informateur> getInformateurs() {
		return informateurDao.findByStatus(false);
	}

	@GetMapping(value = "/list-by-source/{idSource}")
	public List<Informateur> getInformateursBySourceInformation(
			@PathVariable("idSource") Long idSource
	) {
		return informateurDao.findByStatusAndSourceInformation_Id(false, idSource);
	}


	@PostMapping(value = "/save")
	public Informateur save(@RequestBody Informateur informateur) {



//		informateur.setCreateBy();
		return	informateurDao.saveAndFlush(informateur);
	}

	@PostMapping(value = "/delete")
	public Informateur delete(@RequestBody Informateur informateur) {

		informateur.setStatus(true);
		return	informateurDao.saveAndFlush(informateur);
	}
	
	@GetMapping(value = "/recherche-informateur/")
	public Informateur listInformateurs(@CurrentUser UserPrincipal currentUser) {
		java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
		return informateurDao.findByStatusAndEmailOrTel(false, meUser.get().getEmail(), meUser.get().getTel());
	}

}
