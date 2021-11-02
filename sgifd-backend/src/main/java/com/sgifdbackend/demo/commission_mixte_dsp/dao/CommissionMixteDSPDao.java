package com.sgifdbackend.demo.commission_mixte_dsp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sgifdbackend.demo.commission_mixte_dsp.entities.CommissionMixteDSP;

public interface CommissionMixteDSPDao extends JpaRepository<CommissionMixteDSP, Long> {
	
	public List<CommissionMixteDSP> findByStatus(Boolean status);
	
	public CommissionMixteDSP findByIdIs(Long id);

}
