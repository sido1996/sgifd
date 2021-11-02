package com.sgifdbackend.demo.rapport.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.enums.FonctionnaliteName;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "t_RapportParams")
public class RapportParams extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cle;
    private String valeur;
    
    private String libelle;
    
    private Boolean estChampsDeSaisie = true;

    private Boolean selectionRetourneId = false;

    private Boolean selectionRetourneLibelle = false;

    private Boolean selectionRetourneCode = false;
    
    FonctionnaliteName fonctionnaliteName;
    
    @ManyToOne
    private Rapport rapport;

    public RapportParams() {
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public String getCle() {
		return cle;
	}

	public void setCle(String cle) {
		this.cle = cle;
	}

	public String getValeur() {
		return valeur;
	}

	public void setValeur(String valeur) {
		this.valeur = valeur;
	}

	@JsonIgnore
	public Rapport getRapport() {
		return rapport;
	}

	public void setRapport(Rapport rapport) {
		this.rapport = rapport;
	}

	public Boolean getEstChampsDeSaisie() {
		return estChampsDeSaisie;
	}

	public void setEstChampsDeSaisie(Boolean estChampsDeSaisie) {
		this.estChampsDeSaisie = estChampsDeSaisie;
	}

	public FonctionnaliteName getFonctionnaliteName() {
		return fonctionnaliteName;
	}

	public void setFonctionnaliteName(FonctionnaliteName fonctionnaliteName) {
		this.fonctionnaliteName = fonctionnaliteName;
	}

	public Boolean getSelectionRetourneId() {
		return selectionRetourneId;
	}

	public void setSelectionRetourneId(Boolean selectionRetourneId) {
		this.selectionRetourneId = selectionRetourneId;
	}

	public Boolean getSelectionRetourneLibelle() {
		return selectionRetourneLibelle;
	}

	public void setSelectionRetourneLibelle(Boolean selectionRetourneLibelle) {
		this.selectionRetourneLibelle = selectionRetourneLibelle;
	}

	public Boolean getSelectionRetourneCode() {
		return selectionRetourneCode;
	}

	public void setSelectionRetourneCode(Boolean selectionRetourneCode) {
		this.selectionRetourneCode = selectionRetourneCode;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
    
}
