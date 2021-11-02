package com.sgifdbackend.demo.commission_mixte_dsp.api;

import com.sgifdbackend.demo.commission_mixte_dsp.dao.AxePrioritaireCommissionDao;
import com.sgifdbackend.demo.commission_mixte_dsp.dao.CommissionMixteDSPDao;
import com.sgifdbackend.demo.commission_mixte_dsp.entities.AxePrioritaireCommission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/axe-prioritaire-commission-mixte")
public class AxePrioritaireCommissionApi {
	
	@Autowired
	private AxePrioritaireCommissionDao axePrioritaireCommissionDao;

	@Autowired
	private CommissionMixteDSPDao commissionMixteDSPDao;

	@GetMapping(value = "/list/{id}")
	public List<AxePrioritaireCommission> getPrevisions(@PathVariable("id") Long id) {
		return axePrioritaireCommissionDao.findByStatusAndCommissionMixteDSP(false, commissionMixteDSPDao.findById(id).get());
	}

	@PostMapping(value = "/delete")
	public AxePrioritaireCommission delete(@RequestBody AxePrioritaireCommission axePrioritaireCommission) {

		axePrioritaireCommissionDao.delete(axePrioritaireCommission);
		return	axePrioritaireCommission;
	}
	
}
