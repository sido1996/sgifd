package com.sgifdbackend.demo.security.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.enums.ActionOfFonctionnaliteName;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "t_ActionOfFonctionnalite")
public class ActionOfFonctionnalite  extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(name = "ACTION_OF_FONCTIONNALITE_NAME",length = 60)
    private ActionOfFonctionnaliteName name;


    public ActionOfFonctionnalite(ActionOfFonctionnaliteName name) {
    	this.name = name;
    }
    
    public ActionOfFonctionnalite() {
    }

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ActionOfFonctionnaliteName getName() {
		return name;
	}

	public void setName(ActionOfFonctionnaliteName name) {
		this.name = name;
	}

}
