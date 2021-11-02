package com.sgifdbackend.demo.requetefinancement.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.NatureFinancement;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "t_InstructionRequete")
public class InstructionRequete  extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String libelle;

    private Date dateIdentification;
    
    private Date datePreparation;
    
    private Date dateEvaluation;
    
    private Date dateNegociation;
    
    private Date dateApprobation;
    
    private Date dateSignature;

    @ManyToOne
    private RequeteFinancement requeteFinancement ;

    public InstructionRequete() {
    }

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public Date getDateIdentification() {
		return dateIdentification;
	}

	public void setDateIdentification(Date dateIdentification) {
		this.dateIdentification = dateIdentification;
	}

	public Date getDatePreparation() {
		return datePreparation;
	}

	public void setDatePreparation(Date datePreparation) {
		this.datePreparation = datePreparation;
	}

	public Date getDateEvaluation() {
		return dateEvaluation;
	}

	public void setDateEvaluation(Date dateEvaluation) {
		this.dateEvaluation = dateEvaluation;
	}

	public Date getDateNegociation() {
		return dateNegociation;
	}

	public void setDateNegociation(Date dateNegociation) {
		this.dateNegociation = dateNegociation;
	}

	public Date getDateApprobation() {
		return dateApprobation;
	}

	public void setDateApprobation(Date dateApprobation) {
		this.dateApprobation = dateApprobation;
	}

	public Date getDateSignature() {
		return dateSignature;
	}

	public void setDateSignature(Date dateSignature) {
		this.dateSignature = dateSignature;
	}

	@JsonIgnore
	public RequeteFinancement getRequeteFinancement() {
		return requeteFinancement;
	}

	public void setRequeteFinancement(RequeteFinancement requeteFinancement) {
		this.requeteFinancement = requeteFinancement;
	}

}
