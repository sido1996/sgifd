package com.sgifdbackend.demo.parametrage.entites;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;

@Entity
@Table(name="t_Informateur")
public class Informateur extends EntityBaseBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nom;
	
	private String prenom;
	
	private String tel;
	
	private String email;
	
	private String profession;
	
	private String adresse;	
	
	@ManyToOne StructureBeneficiaire sourceInformation;
	
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}


	public String getPrenom() {
		return prenom;
	}


	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}


	public String getTel() {
		return tel;
	}


	public void setTel(String tel) {
		this.tel = tel;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getProfession() {
		return profession;
	}


	public void setProfession(String profession) {
		this.profession = profession;
	}


	public String getAdresse() {
		return adresse;
	}


	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public Informateur() {
		// TODO Auto-generated constructor stub
	}

	public StructureBeneficiaire getSourceInformation() {
		return sourceInformation;
	}

	public void setSourceInformation(StructureBeneficiaire sourceInformation) {
		this.sourceInformation = sourceInformation;
	}


}
