package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.ZoneLocaliteDao;
import com.sgifdbackend.demo.parametrage.entites.Arrondissement;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.TypeStructure;
import com.sgifdbackend.demo.parametrage.entites.ZoneLocalite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/zone-localite")
public class ZoneLocaliteApi {


//	@Autowired
//	private zoneLocaliteDao zoneLocaliteDao;
	
	@Autowired
	private ZoneLocaliteDao zoneLocaliteDao;


	@GetMapping(value = "/list")
	public List<ZoneLocalite> getZoneLocalites() {
		return zoneLocaliteDao.findByStatus(false);
	}
	
	
	@GetMapping(value = "/list/{id}")
	public List<ZoneLocalite> getZoneLocalitesParArrondissement(@PathVariable Long id) {
		return zoneLocaliteDao.findByArrondissement_id(id);
	}


	@PostMapping(value = "/save")
	public ZoneLocalite save(@RequestBody ZoneLocalite zoneLocalite) {
//		zoneLocalite.setCreateBy();
		return	zoneLocaliteDao.saveAndFlush(zoneLocalite);
	}

	@PostMapping(value = "/delete")
	public ZoneLocalite delete(@RequestBody ZoneLocalite ZoneLocalite) {

		ZoneLocalite.setStatus(true);
		return	zoneLocaliteDao.saveAndFlush(ZoneLocalite);
	}

	@GetMapping(value = "/get/{id}")
	public ZoneLocalite getById(@PathVariable("id") Long id) {
		return zoneLocaliteDao.findById(id).get();
	}

}
