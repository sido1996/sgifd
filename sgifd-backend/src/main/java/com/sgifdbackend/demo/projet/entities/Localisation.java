package com.sgifdbackend.demo.projet.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.Arrondissement;
import com.sgifdbackend.demo.parametrage.entites.Commune;
import com.sgifdbackend.demo.parametrage.entites.Departement;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.parametrage.entites.ZoneLocalite;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "t_Localisation")
public class Localisation extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //private String libelle;    
    
    @ManyToOne
    private ZoneLocalite zoneLocalite;

    @ManyToOne
    private Departement departement;

    @ManyToOne
    private Commune commune;
    
    @ManyToOne
    private Arrondissement arrondissement;

    @ManyToOne()
    private ProjetProgrammeIdee projetProgrammeIdee;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }   

    /*public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }*/

	public ZoneLocalite getZoneLocalite() {
		return zoneLocalite;
	}

	public void setZoneLocalite(ZoneLocalite zoneLocalite) {
		this.zoneLocalite = zoneLocalite;
	}

	public Arrondissement getArrondissement() {
		return arrondissement;
	}

	public void setArrondissement(Arrondissement arrondissement) {
		this.arrondissement = arrondissement;
	}

	public Departement getDepartement() {
		return departement;
	}

	public void setDepartement(Departement departement) {
		this.departement = departement;
	}

	public Commune getCommune() {
		return commune;
	}

	public void setCommune(Commune commune) {
		this.commune = commune;
	}

	@JsonIgnore
	public ProjetProgrammeIdee getProjetProgrammeIdee() {
		return projetProgrammeIdee;
	}

	public void setProjetProgrammeIdee(ProjetProgrammeIdee projetProgrammeIdee) {
		this.projetProgrammeIdee = projetProgrammeIdee;
	}

	@Override
	public String toString() {
		return "Localisation [id=" + id + ", zoneLocalite=" + zoneLocalite + "]";
	}

	/*@Override
	public String toString() {
		return "Localisation [id=" + id + ", libelle=" + libelle + "]";
	}*/
    
	
}
