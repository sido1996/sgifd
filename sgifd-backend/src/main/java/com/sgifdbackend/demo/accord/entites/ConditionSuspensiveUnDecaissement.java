package com.sgifdbackend.demo.accord.entites;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
@Entity
@Table(name = "t_ConditionSuspensiveUnDecaissement")
public class ConditionSuspensiveUnDecaissement extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String libelle;

    private String etat;
    private String observations;
    
    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private Accord accord;

    public ConditionSuspensiveUnDecaissement() {
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

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public String getObservations() {
		return observations;
	}

	public void setObservations(String observations) {
		this.observations = observations;
	}
	
	@JsonIgnore
	public Accord getAccord() {
		return accord;
	}

	public void setAccord(Accord accord) {
		this.accord = accord;
	}

}
