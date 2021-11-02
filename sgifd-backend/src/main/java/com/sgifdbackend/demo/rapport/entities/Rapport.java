package com.sgifdbackend.demo.rapport.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.security.entities.Role;
import com.sgifdbackend.demo.security.entities.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_Rapport")
public class Rapport extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String libelle;
    
    private Boolean estAccessibleAvecRole = false;

    private Boolean estAccessibleAvecUser = false;
    
    @OneToMany(mappedBy = "rapport")
    private List<RapportParams> rapportParams = new ArrayList<>();
    
    @ManyToMany
    private List<Role> roles = new ArrayList<>();

    @ManyToMany
    private List<User> users = new ArrayList<>();

    public Rapport() {
    }

    public Rapport(String libelle) {
        this.libelle = libelle;
    }

    
    public Rapport(String nom, String libelle) {
		super();
		this.nom = nom;
		this.libelle = libelle;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public List<RapportParams> getRapportParams() {
		return rapportParams;
	}

	public void setRapportParams(List<RapportParams> rapportParams) {
		this.rapportParams = rapportParams;
	}

	public Boolean getEstAccessibleAvecRole() {
		return estAccessibleAvecRole;
	}

	public void setEstAccessibleAvecRole(Boolean estAccessibleAvecRole) {
		this.estAccessibleAvecRole = estAccessibleAvecRole;
	}

	public Boolean getEstAccessibleAvecUser() {
		return estAccessibleAvecUser;
	}

	public void setEstAccessibleAvecUser(Boolean estAccessibleAvecUser) {
		this.estAccessibleAvecUser = estAccessibleAvecUser;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}
    
}
