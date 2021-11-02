package com.sgifdbackend.demo.commission_mixte_dsp.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgifdbackend.demo.commission_mixte_dsp.dao.AxePrioritaireCommissionDao;
import com.sgifdbackend.demo.commission_mixte_dsp.dao.CommissionMixteDSPDao;
import com.sgifdbackend.demo.commission_mixte_dsp.entities.AxePrioritaireCommission;
import com.sgifdbackend.demo.commission_mixte_dsp.entities.CommissionMixteDSP;
import com.sgifdbackend.demo.parametrage.entites.DBFile;

@RestController
@CrossOrigin("*")
@RequestMapping("/commission-mixte-dsp")
public class CommissionMixteDSPApi {

	@Autowired
	private CommissionMixteDSPDao commissionMixteDSPDao;

	@Autowired
	private AxePrioritaireCommissionDao axePrioritaireCommissionDao;


	@GetMapping(value = "/list")
	public List<CommissionMixteDSP> getCommissionMixteDSPs() {
		return commissionMixteDSPDao.findByStatus(false);
	}

	@PostMapping(value = "/save")
	public CommissionMixteDSP save(@RequestBody CommissionMixteDSP commissionMixteDSP) {
		System.out.println(commissionMixteDSP);
		CommissionMixteDSP uneCommissionMixteDSP = commissionMixteDSPDao.saveAndFlush(commissionMixteDSP);

		List<AxePrioritaireCommission> axePrioritaireCommissions = commissionMixteDSP.getAxePrioritaireCommissions();
		
		for(int i=0; i < axePrioritaireCommissions.size(); i++) {
			axePrioritaireCommissions.get(i).setCommissionMixteDSP(uneCommissionMixteDSP);
			axePrioritaireCommissionDao.saveAndFlush(axePrioritaireCommissions.get(i));
		}
		
		return	uneCommissionMixteDSP;
	}

	@PostMapping(value = "/delete")
	public CommissionMixteDSP delete(@RequestBody CommissionMixteDSP commissionMixteDSP) {

		commissionMixteDSP.setStatus(true);
		return	commissionMixteDSPDao.saveAndFlush(commissionMixteDSP);
	}

	@GetMapping(value = "/detail/{id}")
	public CommissionMixteDSP getById(@PathVariable("id") Long id) {
		return commissionMixteDSPDao.findById(id).get();
	}
	
	@PostMapping(value = "/save-file/{id}")
	public CommissionMixteDSP saveFile(@PathVariable("id") Long id, @RequestBody DBFile dBFile) {
		CommissionMixteDSP commissionMixteDSP = commissionMixteDSPDao.findById(id).get();
		commissionMixteDSP.getFiles().add(dBFile);
		dBFile.setCommissionMixteDSP(commissionMixteDSP);

		return	commissionMixteDSPDao.saveAndFlush(commissionMixteDSP);
	}
}
