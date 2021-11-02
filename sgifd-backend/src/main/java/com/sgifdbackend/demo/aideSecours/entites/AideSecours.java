package com.sgifdbackend.demo.aideSecours.entites;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.sgifdbackend.demo.parametrage.entites.Informateur;
import com.sgifdbackend.demo.parametrage.entites.NatureAssistance;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.Pays;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
@Entity
@Table(name="t_AideSecours")
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)

@DiscriminatorColumn(name="type", discriminatorType=DiscriminatorType.STRING, length=4)
public abstract class AideSecours extends EntityBaseBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private Double montant;
	
	private Double montantDevise;
	
	private String observations;

    @ManyToOne
    private DeviseMonnaie deviseMonnaie;
    
	@ManyToOne
	private Annee exercice;
	
	@ManyToOne
	private PTFBailleurFrs ptfBailleurFrs;
	
	@ManyToOne
	private NatureAssistance natureAssistance;
	
	@ManyToOne
	private Informateur informateur;

    @OneToMany(mappedBy = "aideSecours", cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private List<DBFile> files = new ArrayList<>();
	
	public AideSecours(Long id, Double montant, String observation, Annee annee, 
			PTFBailleurFrs ptfBailleurFrs, NatureAssistance natureAssistance, Informateur informateur) {
		this.id = id;
		this.montant = montant;
		this.exercice = annee;
		this.ptfBailleurFrs = ptfBailleurFrs;
		this.observations = observation;
		this.natureAssistance= natureAssistance;
		this.informateur = informateur;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getMontant() {
		return montant;
	}

	public void setMontant(Double montant) {
		this.montant = montant;
	}

	public String getObservations() {
		return observations;
	}

	public void setObservations(String observations) {
		this.observations = observations;
	}

	public Annee getExercice() {
		return exercice;
	}

	public void setExercice(Annee exercice) {
		this.exercice = exercice;
	}

	public NatureAssistance getNatureAssistance() {
		return natureAssistance;
	}

	public void setNatureAssistance(NatureAssistance natureAssistance) {
		this.natureAssistance = natureAssistance;
	}

	public Informateur getInformateur() {
		return informateur;
	}

	public void setInformateur(Informateur informateur) {
		this.informateur = informateur;
	}

	

	public AideSecours() {
		// TODO Auto-generated constructor stub
	}

	public PTFBailleurFrs getPtfBailleurFrs() {
		return ptfBailleurFrs;
	}

	public void setPtfBailleurFrs(PTFBailleurFrs ptfBailleurFrs) {
		this.ptfBailleurFrs = ptfBailleurFrs;
	}

	public List<DBFile> getFiles() {
		return files;
	}

	public void setFiles(List<DBFile> files) {
		this.files = files;
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

}
