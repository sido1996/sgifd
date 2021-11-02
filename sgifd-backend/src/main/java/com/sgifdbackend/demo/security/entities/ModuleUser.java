package com.sgifdbackend.demo.security.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.enums.ModuleName;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_ModuleUser")
public class ModuleUser  extends EntityBaseBean implements Serializable {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToMany
    private List<FonctionnaliteUser> fonctionnaliteUsers  = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(name = "MODULE_NAME",length = 60)
    private ModuleName name;
    
    private String libelle;

    public ModuleUser(ModuleName name) {
    	this.name = name;
    }
    
    public ModuleUser() {
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

	public ModuleName getName() {
		return name;
	}

	public void setName(ModuleName name) {
		this.name = name;
	}

	public List<FonctionnaliteUser> getFonctionnaliteUsers() {
		return fonctionnaliteUsers;
	}

	public void setFonctionnaliteUsers(List<FonctionnaliteUser> fonctionnaliteUsers) {
		this.fonctionnaliteUsers = fonctionnaliteUsers;
	}


}
