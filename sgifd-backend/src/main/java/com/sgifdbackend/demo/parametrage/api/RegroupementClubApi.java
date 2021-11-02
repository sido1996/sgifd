package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.RegroupementClubDao;
import com.sgifdbackend.demo.parametrage.dao.RegroupementClubDao;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.RegroupementClub;
import com.sgifdbackend.demo.parametrage.entites.RegroupementClub;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/regroupement-club-ptf")
public class RegroupementClubApi {


//	@Autowired
//	private RegroupementClubDao RegroupementClubDao;
	
	@Autowired
	private RegroupementClubDao regroupementClubDao;


	@GetMapping(value = "/list")
	public List<RegroupementClub> getRegroupementClubs() {
		return regroupementClubDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public RegroupementClub save(@RequestBody RegroupementClub regroupementClub) {

//		RegroupementClub.setCreateBy();
		return	regroupementClubDao.saveAndFlush(regroupementClub);
	}

	@PostMapping(value = "/delete")
	public RegroupementClub delete(@RequestBody RegroupementClub regroupementClub) {

		regroupementClub.setStatus(true);
		return	regroupementClubDao.saveAndFlush(regroupementClub);
	}

	@GetMapping(value = "/get/{id}")
	public RegroupementClub getById(@PathVariable("id") Long id) {
		return regroupementClubDao.findById(id).get();
	}

}
