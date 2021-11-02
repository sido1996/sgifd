package com.sgifdbackend.demo.parametrage.entites;

import com.sgifdbackend.demo.accord.entites.Accord;
import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_ODD")
public class ODD extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String libelle;

    private String code;

    @OneToMany(mappedBy = "odd")
    private List<Cible> cibles = new ArrayList<>();

    @ManyToMany(fetch=FetchType.EAGER)
    private List<Accord> accords = new ArrayList<>();
    
    public ODD() {
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

    public List<Accord> getAccords() {
        return accords;
    }

    public void setAccords(List<Accord> accords) {
        this.accords = accords;
    }

    @JsonIgnore
	public List<Cible> getCibles() {
		return cibles;
	}

	public void setCibles(List<Cible> cibles) {
		this.cibles = cibles;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
    
}
