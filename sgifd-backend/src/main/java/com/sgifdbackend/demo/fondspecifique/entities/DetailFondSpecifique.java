package com.sgifdbackend.demo.fondspecifique.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.Commune;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.sgifdbackend.demo.parametrage.entites.DomainePTF;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.Pays;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.parametrage.entites.Promoteur;
import com.sgifdbackend.demo.parametrage.entites.Secteur;
import com.sgifdbackend.demo.parametrage.entites.StructureBeneficiaire;
import com.sgifdbackend.demo.parametrage.entites.TypeFondSpecifique;
import com.sgifdbackend.demo.parametrage.entites.ZoneLocalite;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_DetailFondSpecifique")
public class DetailFondSpecifique extends EntityBaseBean implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    private  Double montantDevise;

    private  Double montantFcfa;

    @ManyToOne
    private DeviseMonnaie deviseMonnaie;

    @ManyToOne
    private ProjetProgrammeIdee projetProgramme;

    @ManyToOne
    private FondSpecifique fondSpecifique;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getMontantDevise() {
		return montantDevise;
	}

	public void setMontantDevise(Double montantDevise) {
		this.montantDevise = montantDevise;
	}

	public Double getMontantFcfa() {
		return montantFcfa;
	}

	public void setMontantFcfa(Double montantFcfa) {
		this.montantFcfa = montantFcfa;
	}

	public DeviseMonnaie getDeviseMonnaie() {
		return deviseMonnaie;
	}

	public void setDeviseMonnaie(DeviseMonnaie deviseMonnaie) {
		this.deviseMonnaie = deviseMonnaie;
	}	

	public ProjetProgrammeIdee getProjetProgramme() {
		return projetProgramme;
	}

	public void setProjetProgramme(ProjetProgrammeIdee projetProgramme) {
		this.projetProgramme = projetProgramme;
	}

	@JsonIgnore
	public FondSpecifique getFondSpecifique() {
		return fondSpecifique;
	}

	public void setFondSpecifique(FondSpecifique fondSpecifique) {
		this.fondSpecifique = fondSpecifique;
	}
   
}
