package com.sgifdbackend.demo.requetefinancement.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "t_RelanceRequeteFinancement")
public class RelanceRequeteFinancement  extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String libelle;

    private Date dateRelance;

    @ManyToOne
    private RessourceExterieure ressourceExterieure ;

    public RelanceRequeteFinancement() {
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

	public Date getDateRelance() {
		return dateRelance;
	}

	public void setDateRelance(Date dateRelance) {
		this.dateRelance = dateRelance;
	}

	@JsonIgnore
	public RessourceExterieure getRessourceExterieure() {
		return ressourceExterieure;
	}

	public void setRessourceExterieure(RessourceExterieure ressourceExterieure) {
		this.ressourceExterieure = ressourceExterieure;
	}

}
