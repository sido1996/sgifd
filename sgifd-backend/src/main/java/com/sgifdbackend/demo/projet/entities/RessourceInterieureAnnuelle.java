package com.sgifdbackend.demo.projet.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.sgifdbackend.demo.parametrage.entites.NatureAssistance;
import com.sgifdbackend.demo.parametrage.entites.NatureFinancement;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.parametrage.entites.TypeAssistance;
import com.sgifdbackend.demo.parametrage.entites.TypeRessourceInterieure;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "t_RessourceInterieureAnnuelle")
public class RessourceInterieureAnnuelle extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String libelle;

    @ManyToOne
    private Annee annee;
	
	@ManyToOne
    private TypeRessourceInterieure typeRessourceInterieure;

    @ManyToOne()
    private ProjetProgrammeIdee projetProgrammeIdee;

    private Double montantRessourceProgrammer;

    private Double montantRessourceEngager;

    private Double montantRessourceOrdonnancer;

    public RessourceInterieureAnnuelle() {
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

	public Annee getAnnee() {
		return annee;
	}

	public void setAnnee(Annee annee) {
		this.annee = annee;
	}
	
	public TypeRessourceInterieure getTypeRessourceInterieure() {
		return typeRessourceInterieure;
	}

	public void setTypeRessourceInterieure(TypeRessourceInterieure typeRessourceInterieure) {
		this.typeRessourceInterieure = typeRessourceInterieure;
	}

	@JsonIgnore
	public ProjetProgrammeIdee getProjetProgrammeIdee() {
		return projetProgrammeIdee;
	}

	public void setProjetProgrammeIdee(ProjetProgrammeIdee projetProgrammeIdee) {
		this.projetProgrammeIdee = projetProgrammeIdee;
	}

	public Double getMontantRessourceEngager() {
		return montantRessourceEngager;
	}

	public void setMontantRessourceEngager(Double montantRessourceEngager) {
		this.montantRessourceEngager = montantRessourceEngager;
	}

	public Double getMontantRessourceProgrammer() {
		return montantRessourceProgrammer;
	}

	public void setMontantRessourceProgrammer(Double montantRessourceProgrammer) {
		this.montantRessourceProgrammer = montantRessourceProgrammer;
	}

	public Double getMontantRessourceOrdonnancer() {
		return montantRessourceOrdonnancer;
	}

	public void setMontantRessourceOrdonnancer(Double montantRessourceOrdonnancer) {
		this.montantRessourceOrdonnancer = montantRessourceOrdonnancer;
	}
    
}
