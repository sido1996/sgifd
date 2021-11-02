package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.GrandSecteurDao;
import com.sgifdbackend.demo.parametrage.entites.FiliereBourseEtude;
import com.sgifdbackend.demo.parametrage.entites.GrandSecteur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/grand-secteur")
public class GrandSecteurApi {


//	@Autowired
//	private grandSecteurDao grandSecteurDao;
	
	@Autowired
	private GrandSecteurDao grandSecteurDao;


	@GetMapping(value = "/list")
	public List<GrandSecteur> getGrandSecteurs() {
		return grandSecteurDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public GrandSecteur save(@RequestBody GrandSecteur grandSecteur) {



//		grandSecteur.setCreateBy();
		return	grandSecteurDao.saveAndFlush(grandSecteur);
	}

	@PostMapping(value = "/delete")
	public GrandSecteur delete(@RequestBody GrandSecteur GrandSecteur) {

		GrandSecteur.setStatus(true);
		return	grandSecteurDao.saveAndFlush(GrandSecteur);
	}

	@GetMapping(value = "/get/{id}")
	public GrandSecteur getById(@PathVariable("id") Long id) {
		return grandSecteurDao.findById(id).get();
	}

}
