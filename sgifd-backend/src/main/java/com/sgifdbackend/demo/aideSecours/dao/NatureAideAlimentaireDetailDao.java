package com.sgifdbackend.demo.aideSecours.dao;

import com.sgifdbackend.demo.aideSecours.entites.NatureAideAlimentaireDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NatureAideAlimentaireDetailDao extends JpaRepository<NatureAideAlimentaireDetail, Long> {
		
	List<NatureAideAlimentaireDetail> findByStatus(Boolean status);
	
	

}
