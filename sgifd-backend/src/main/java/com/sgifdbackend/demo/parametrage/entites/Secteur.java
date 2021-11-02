package com.sgifdbackend.demo.parametrage.entites;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_secteur")
public class Secteur extends EntityBaseBean implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String libelle;

    @ManyToOne
    private GrandSecteur grandSecteur;

    @OneToMany(mappedBy = "secteur")
    private List<SousSecteur> SousSecteur = new ArrayList<>();

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

	public GrandSecteur getGrandSecteur() {
		return grandSecteur;
	}

	public void setGrandSecteur(GrandSecteur grandSecteur) {
		this.grandSecteur = grandSecteur;
	}

	@JsonIgnore
	public List<SousSecteur> getSousSecteur() {
		return SousSecteur;
	}

	public void setSousSecteur(List<SousSecteur> sousSecteur) {
		SousSecteur = sousSecteur;
	}
    
}
