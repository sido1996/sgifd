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
@Table(name = "t_ReponseRequeteFinancement")
public class ReponseRequeteFinancement  extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String libelle;

    private Date dateReponse;

    private Double montantRessourceProgrammer;

    @ManyToOne
    private NatureFinancement natureFinancement;

    @ManyToOne
    private RessourceExterieure ressourceExterieure ;

    public ReponseRequeteFinancement() {
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

	public Date getDateReponse() {
		return dateReponse;
	}

	public void setDateReponse(Date dateReponse) {
		this.dateReponse = dateReponse;
	}

	public Double getMontantRessourceProgrammer() {
		return montantRessourceProgrammer;
	}

	public void setMontantRessourceProgrammer(Double montantRessourceProgrammer) {
		this.montantRessourceProgrammer = montantRessourceProgrammer;
	}

	public NatureFinancement getNatureFinancement() {
		return natureFinancement;
	}

	public void setNatureFinancement(NatureFinancement natureFinancement) {
		this.natureFinancement = natureFinancement;
	}

	@JsonIgnore
	public RessourceExterieure getRessourceExterieure() {
		return ressourceExterieure;
	}

	public void setRessourceExterieure(RessourceExterieure ressourceExterieure) {
		this.ressourceExterieure = ressourceExterieure;
	}

}
