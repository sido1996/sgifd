package com.sgifdbackend.demo.security.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.enums.FonctionnaliteName;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "t_Fonctionnalite")
public class FonctionnaliteUser  extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(name = "FONCTIONNALITE_NAME",length = 60)
    private FonctionnaliteName name;

    private String libelle;

    public FonctionnaliteUser(FonctionnaliteName name) {
    	this.name = name;
    }

    public FonctionnaliteUser() {
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

	public FonctionnaliteName getName() {
		return name;
	}

	public void setName(FonctionnaliteName name) {
		this.name = name;
	}


}
