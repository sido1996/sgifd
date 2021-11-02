package com.sgifdbackend.demo.parametrage.dao;

import java.util.List;
import java.util.Optional;

import com.sgifdbackend.demo.parametrage.entites.StructureBeneficiaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgifdbackend.demo.parametrage.entites.Informateur;

@Repository
public interface InformateurDao extends JpaRepository<Informateur, Long> {
	public Optional<Informateur> findById(Long id); 
	
	public Informateur findInformateurById(Long id);
	
	List<Informateur> findByStatus(Boolean status);
	public Informateur findByStatusAndEmailOrTel(Boolean status, String email, String tel);
	public Informateur findByStatusAndEmail(Boolean status, String email);
	public List<Informateur> findByStatusAndSourceInformation_Id(Boolean status, Long sourceInformationId);


}
