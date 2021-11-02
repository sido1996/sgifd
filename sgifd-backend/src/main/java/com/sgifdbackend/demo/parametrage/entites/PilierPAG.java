package com.sgifdbackend.demo.parametrage.entites;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "t_PilierPAG")
@EntityListeners(AuditingEntityListener.class)
public class PilierPAG extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String libelle;

    private String code;

    @OneToMany(mappedBy = "pilierPAG")
    private List<AxePrioritaire> axePrioritaire = new ArrayList<>();
    
    public PilierPAG() {
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

    @JsonIgnore
	public List<AxePrioritaire> getAxePrioritaire() {
		return axePrioritaire;
	}

	public void setAxePrioritaire(List<AxePrioritaire> axePrioritaire) {
		this.axePrioritaire = axePrioritaire;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
    
}
