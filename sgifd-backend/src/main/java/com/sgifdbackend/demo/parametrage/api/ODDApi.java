package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.ODDDao;
import com.sgifdbackend.demo.parametrage.entites.NiveauMaturite;
import com.sgifdbackend.demo.parametrage.entites.ODD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/odd")
public class ODDApi {


//	@Autowired
//	private oDDDao oDDDao;
	
	@Autowired
	private ODDDao oDDDao;


	@GetMapping(value = "/list")
	public List<ODD> getODDs() {
		return oDDDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public ODD save(@RequestBody ODD oDD) {



//		oDD.setCreateBy();
		return	oDDDao.saveAndFlush(oDD);
	}

	@PostMapping(value = "/delete")
	public ODD delete(@RequestBody ODD ODD) {

		ODD.setStatus(true);
		return	oDDDao.saveAndFlush(ODD);
	}

	@GetMapping(value = "/get/{id}")
	public ODD getById(@PathVariable("id") Long id) {
		return oDDDao.findById(id).get();
	}

}
