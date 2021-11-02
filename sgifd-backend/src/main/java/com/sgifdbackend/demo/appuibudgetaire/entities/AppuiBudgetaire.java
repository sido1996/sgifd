package com.sgifdbackend.demo.appuibudgetaire.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.sgifdbackend.demo.parametrage.entites.NatureAssistance;
import com.sgifdbackend.demo.parametrage.entites.NatureFinancement;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.StructureBeneficiaire;
import com.sgifdbackend.demo.parametrage.entites.TypeAppuiBudgetaire;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name="t_AppuiBudgetaire")
public class AppuiBudgetaire extends EntityBaseBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private  Long id;
	
	@ManyToOne
	private Annee annee;
	
	@ManyToOne
	private  TypeAppuiBudgetaire typeAppuiBudgetaire;
	
	@ManyToOne
	private NatureFinancement natureFinancement;

	@ManyToOne
	private NatureAssistance natureAssistance;
	
	@ManyToOne
	private PTFBailleurFrs ptfBailleurFrs;
	
	private  Double montantDevise;
	
	@ManyToOne
	private DeviseMonnaie deviseMonnaie;
	
	private  Double montant;
	
	private  String observation;
	
	@ManyToOne
	private StructureBeneficiaire structureBeneficiaire;
	
	@OneToMany(mappedBy = "appuibudgetaire", cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private List<DBFile> files = new ArrayList<>();

	public AppuiBudgetaire() {
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Annee getAnnee() {
		return annee;
	}

	public void setAnnee(Annee annee) {
		this.annee = annee;
	}

	public TypeAppuiBudgetaire getTypeAppuiBudgetaire() {
		return typeAppuiBudgetaire;
	}

	public void setTypeAppuiBudgetaire(TypeAppuiBudgetaire typeAppuiBudgetaire) {
		this.typeAppuiBudgetaire = typeAppuiBudgetaire;
	}

	public NatureFinancement getNatureFinancement() {
		return natureFinancement;
	}

	public void setNatureFinancement(NatureFinancement natureFinancement) {
		this.natureFinancement = natureFinancement;
	}

	public NatureAssistance getNatureAssistance() {
		return natureAssistance;
	}

	public void setNatureAssistance(NatureAssistance natureAssistance) {
		this.natureAssistance = natureAssistance;
	}


	public PTFBailleurFrs getPtfBailleurFrs() {
		return ptfBailleurFrs;
	}

	public void setPtfBailleurFrs(PTFBailleurFrs ptfBailleurFrs) {
		this.ptfBailleurFrs = ptfBailleurFrs;
	}

	public Double getMontantDevise() {
		return montantDevise;
	}

	public void setMontantDevise(Double montantDevise) {
		this.montantDevise = montantDevise;
	}

	public DeviseMonnaie getDeviseMonnaie() {
		return deviseMonnaie;
	}

	public void setDeviseMonnaie(DeviseMonnaie deviseMonnaie) {
		this.deviseMonnaie = deviseMonnaie;
	}

	public Double getMontant() {
		return montant;
	}

	public void setMontant(Double montant) {
		this.montant = montant;
	}

	public String getObservation() {
		return observation;
	}

	public void setObservation(String observation) {
		this.observation = observation;
	}

	public StructureBeneficiaire getStructureBeneficiaire() {
		return structureBeneficiaire;
	}

	public void setStructureBeneficiaire(StructureBeneficiaire structureBeneficiaire) {
		this.structureBeneficiaire = structureBeneficiaire;
	}
	
	public List<DBFile> getFiles() {
		return files;
	}

	public void setFiles(List<DBFile> files) {
		this.files = files;
	}

	
	
}
