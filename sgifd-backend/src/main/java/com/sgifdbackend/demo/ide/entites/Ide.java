package com.sgifdbackend.demo.ide.entites;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.sgifdbackend.demo.parametrage.entites.Pays;
import com.sgifdbackend.demo.parametrage.entites.Promoteur;
import com.sgifdbackend.demo.parametrage.entites.Secteur;
import com.sgifdbackend.demo.parametrage.entites.TypeCooperation;
import com.sgifdbackend.demo.parametrage.entites.ZoneLocalite;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_ide")
public class Ide extends EntityBaseBean implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    private String libelle;

    private  Double montantTheorique;

    private  Double montantDevise;
    
    private String observation;

    @ManyToOne
    private Annee anneeReception;

    @ManyToOne
    private DeviseMonnaie deviseMonnaie;

    @ManyToOne
    private TypeCooperation typeCooperation;

    @ManyToMany
    private List<ZoneLocalite> zone;
    
    @ManyToMany
    private List<Secteur> secteur;

    @ManyToMany
    private List<Promoteur> promoteurs  = new ArrayList<>();

    @OneToMany(mappedBy="ide")
    private List<PrevisionRealisationIde> previsionRealisationIdes = new ArrayList<>();
    
    @OneToMany(mappedBy = "ide", cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private List<DBFile> files = new ArrayList<>();

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

	public Double getMontantTheorique() {
		return montantTheorique;
	}

	public void setMontantTheorique(Double montantTheorique) {
		this.montantTheorique = montantTheorique;
	}

	public String getObservation() {
		return observation;
	}

	public void setObservation(String observation) {
		this.observation = observation;
	}

	public Annee getAnneeReception() {
		return anneeReception;
	}

	public void setAnneeReception(Annee anneeReception) {
		this.anneeReception = anneeReception;
	}

	public TypeCooperation getTypeCooperation() {
		return typeCooperation;
	}

	public void setTypeCooperation(TypeCooperation typeCooperation) {
		this.typeCooperation = typeCooperation;
	}

	public List<ZoneLocalite> getZone() {
		return zone;
	}

	public void setZone(List<ZoneLocalite> zone) {
		this.zone = zone;
	}

	public List<Secteur> getSecteur() {
		return secteur;
	}

	public void setSecteur(List<Secteur> secteur) {
		this.secteur = secteur;
	}

	public List<Promoteur> getPromoteurs() {
		return promoteurs;
	}

	public void setPromoteurs(List<Promoteur> promoteurs) {
		this.promoteurs = promoteurs;
	}
	
	public List<PrevisionRealisationIde> getPrevisionRealisationIdes() {
		return previsionRealisationIdes;
	}

	public void setPrevisionRealisationIdes(List<PrevisionRealisationIde> previsionRealisationIdes) {
		this.previsionRealisationIdes = previsionRealisationIdes;
	}

	public List<DBFile> getFiles() {
		return files;
	}

	public void setFiles(List<DBFile> files) {
		this.files = files;
	}

	public Double getMontantDevise() {
		return montantDevise;
	}

	public void setMontantDevise(Double montantDevise) {
		this.montantDevise = montantDevise;
	}

	public DeviseMonnaie getDeviseMonnaie() {
		return deviseMonnaie;
	}

	public void setDeviseMonnaie(DeviseMonnaie deviseMonnaie) {
		this.deviseMonnaie = deviseMonnaie;
	}
	
}
