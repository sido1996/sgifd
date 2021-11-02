package com.sgifdbackend.demo.parametrage.entites;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "t_DeviseMonnaieHist")
public class DeviseMonnaieHist extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String libelle;
    
	private Date dateConversion ;

    @ManyToOne
    private DeviseMonnaie deviseMonaie;

    private Double montantEquivalent;

    public DeviseMonnaieHist() {
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

	public Date getDateConversion() {
		return dateConversion;
	}

	public void setDateConversion(Date dateConversion) {
		this.dateConversion = dateConversion;
	}

	public DeviseMonnaie getDeviseMonaie() {
		return deviseMonaie;
	}

	public void setDeviseMonaie(DeviseMonnaie deviseMonaie) {
		this.deviseMonaie = deviseMonaie;
	}

	public Double getMontantEquivalent() {
		return montantEquivalent;
	}

	public void setMontantEquivalent(Double montantEquivalent) {
		this.montantEquivalent = montantEquivalent;
	}
    
}
