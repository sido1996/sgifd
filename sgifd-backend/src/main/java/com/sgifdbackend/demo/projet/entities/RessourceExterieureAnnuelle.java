package com.sgifdbackend.demo.projet.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.sgifdbackend.demo.parametrage.entites.NatureFinancement;
import com.sgifdbackend.demo.parametrage.entites.TypeAssistance;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "t_RessourceExterieureAnnuelle")
public class RessourceExterieureAnnuelle extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	private String libelle;

    @ManyToOne
    private Annee annee;
    
    @ManyToOne
    private DeviseMonnaie deviseMonnaie;

    @ManyToOne
    private RessourceExterieure ressourceExterieure;

    private Double montantRessourceProgrammer;

    private Double montantRessourceApprouver;

    private Double montantRessourceDecaisser;    

    private Double montantRessourceDecaisserFcfa;
    
    private Double montantConsommeFcfa;
	
    public RessourceExterieureAnnuelle() {
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
	

	public DeviseMonnaie getDeviseMonnaie() {
		return deviseMonnaie;
	}

	public void setDeviseMonnaie(DeviseMonnaie deviseMonnaie) {
		this.deviseMonnaie = deviseMonnaie;
	}

	@JsonIgnore
	public RessourceExterieure getRessourceExterieure() {
		return ressourceExterieure;
	}

	public void setRessourceExterieure(RessourceExterieure ressourceExterieure) {
		this.ressourceExterieure = ressourceExterieure;
	}


    public Double getMontantRessourceProgrammer() {
		return montantRessourceProgrammer;
	}

	public void setMontantRessourceProgrammer(Double montantRessourceProgrammer) {
		this.montantRessourceProgrammer = montantRessourceProgrammer;
	}

	public Double getMontantRessourceApprouver() {
		return montantRessourceApprouver;
	}

	public void setMontantRessourceApprouver(Double montantRessourceApprouver) {
		this.montantRessourceApprouver = montantRessourceApprouver;
	}

	public Double getMontantRessourceDecaisser() {
		return montantRessourceDecaisser;
	}

	public void setMontantRessourceDecaisser(Double montantRessourceDecaisser) {
		this.montantRessourceDecaisser = montantRessourceDecaisser;
	}

	public Double getMontantRessourceDecaisserFcfa() {
		return montantRessourceDecaisserFcfa;
	}

	public void setMontantRessourceDecaisserFcfa(Double montantRessourceDecaisserFcfa) {
		this.montantRessourceDecaisserFcfa = montantRessourceDecaisserFcfa;
	}
	
	public Double getMontantConsommeFcfa() {
		return montantConsommeFcfa;
	}

	public void setMontantConsommeFcfa(Double montantConsommeFcfa) {
		this.montantConsommeFcfa = montantConsommeFcfa;
	}
	

}
