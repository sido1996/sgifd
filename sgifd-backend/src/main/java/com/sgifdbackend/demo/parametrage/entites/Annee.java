package com.sgifdbackend.demo.parametrage.entites;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;


import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "t_Annee")
public class Annee extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String libelle;

    public Annee() {
    }

    public Annee(String libelle) {
        this.libelle = libelle;
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

}
