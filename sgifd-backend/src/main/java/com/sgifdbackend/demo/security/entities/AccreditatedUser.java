package com.sgifdbackend.demo.security.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.enums.ActionOfFonctionnaliteName;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_AccreditatedUser")
public class AccreditatedUser  extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private FonctionnaliteUser fonctionnaliteUser;

    @ManyToMany
    private List<ActionOfFonctionnalite> actionOfFonctionnalites = new ArrayList<>();
    
    public AccreditatedUser() {
    }

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@JsonIgnore
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public FonctionnaliteUser getFonctionnaliteUser() {
		return fonctionnaliteUser;
	}

	public void setFonctionnaliteUser(FonctionnaliteUser fonctionnaliteUser) {
		this.fonctionnaliteUser = fonctionnaliteUser;
	}

	public List<ActionOfFonctionnalite> getActionOfFonctionnalites() {
		return actionOfFonctionnalites;
	}

	public void setActionOfFonctionnalites(List<ActionOfFonctionnalite> actionOfFonctionnalites) {
		this.actionOfFonctionnalites = actionOfFonctionnalites;
	}

}
