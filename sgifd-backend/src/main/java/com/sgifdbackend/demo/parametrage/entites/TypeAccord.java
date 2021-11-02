package com.sgifdbackend.demo.parametrage.entites;

import com.sgifdbackend.demo.accord.entites.Accord;
import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_TypeAccord")
public class TypeAccord extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String libelle;

    @OneToMany(mappedBy = "typeAccord")
    private List<Accord> accords = new ArrayList<>();

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
    public List<Accord> getAccords() {
        return accords;
    }

    public void setAccords(List<Accord> accords) {
        this.accords = accords;
    }

    public TypeAccord() {
    }
}
