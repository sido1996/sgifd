package com.sgifdbackend.demo.aideSecours.api;

import com.sgifdbackend.demo.aideSecours.dao.NatureAideAlimentaireDetailDao;
import com.sgifdbackend.demo.aideSecours.entites.NatureAideAlimentaireDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/nature-aide-alimentaire-detail")
public class NatureAideAlimentaireDetailApi {
	@Autowired
	private NatureAideAlimentaireDetailDao natureAideAlimentaireDetailDao;

	@GetMapping(value = "/list")
	public List<NatureAideAlimentaireDetail> getNatureAideAlimentaireDetail() {
		return natureAideAlimentaireDetailDao.findByStatus(false);
	}

	@PostMapping(value = "/save")
	public NatureAideAlimentaireDetail save(@RequestBody NatureAideAlimentaireDetail natureAideAlimentaireDetail) {

		return	natureAideAlimentaireDetailDao.saveAndFlush(natureAideAlimentaireDetail);
	}

	@PostMapping(value = "/delete")
	public NatureAideAlimentaireDetail delete(@RequestBody NatureAideAlimentaireDetail natureAideAlimentaireDetail) {

			natureAideAlimentaireDetailDao.delete(natureAideAlimentaireDetail);
			return natureAideAlimentaireDetail;
	}
	
	@PostMapping(value = "/delete-modification")
	public NatureAideAlimentaireDetail deleteModification(@RequestBody NatureAideAlimentaireDetail natureAideAlimentaireDetail) {
			natureAideAlimentaireDetail.setStatus(true);
			natureAideAlimentaireDetailDao.saveAndFlush(natureAideAlimentaireDetail);
			return natureAideAlimentaireDetail;
	}
	
	@PostMapping(value = "/deleteonupdate")
	public NatureAideAlimentaireDetail deleteOnModification(@RequestBody NatureAideAlimentaireDetail natureAideAlimentaireDetail) {
		
			natureAideAlimentaireDetail.setStatus(true);
			return	natureAideAlimentaireDetailDao.saveAndFlush(natureAideAlimentaireDetail);
	}



}
