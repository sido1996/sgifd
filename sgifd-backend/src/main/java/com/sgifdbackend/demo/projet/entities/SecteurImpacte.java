package com.sgifdbackend.demo.projet.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.Arrondissement;
import com.sgifdbackend.demo.parametrage.entites.Commune;
import com.sgifdbackend.demo.parametrage.entites.Departement;
import com.sgifdbackend.demo.parametrage.entites.GrandSecteur;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.parametrage.entites.Secteur;
import com.sgifdbackend.demo.parametrage.entites.SousSecteur;
import com.sgifdbackend.demo.parametrage.entites.ZoneLocalite;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "t_SecteurImpacte")
public class SecteurImpacte extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //private String libelle;    
    
    @ManyToOne
    private GrandSecteur grandSecteur;

    @ManyToOne
    private Secteur secteur;

    @ManyToOne
    private SousSecteur sousSecteur;

    @ManyToOne()
    private ProjetProgrammeIdee projetProgrammeIdee;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public GrandSecteur getGrandSecteur() {
		return grandSecteur;
	}

	public void setGrandSecteur(GrandSecteur grandSecteur) {
		this.grandSecteur = grandSecteur;
	}

	public Secteur getSecteur() {
		return secteur;
	}

	public void setSecteur(Secteur secteur) {
		this.secteur = secteur;
	}

	public SousSecteur getSousSecteur() {
		return sousSecteur;
	}

	public void setSousSecteur(SousSecteur sousSecteur) {
		this.sousSecteur = sousSecteur;
	}

	@JsonIgnore
	public ProjetProgrammeIdee getProjetProgrammeIdee() {
		return projetProgrammeIdee;
	}

	public void setProjetProgrammeIdee(ProjetProgrammeIdee projetProgrammeIdee) {
		this.projetProgrammeIdee = projetProgrammeIdee;
	}   

    
	
}
