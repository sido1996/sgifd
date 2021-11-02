package com.sgifdbackend.demo.cooperationdecentralisee.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.Commune;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.sgifdbackend.demo.parametrage.entites.DomainePTF;
import com.sgifdbackend.demo.parametrage.entites.Informateur;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.Pays;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.parametrage.entites.Promoteur;
import com.sgifdbackend.demo.parametrage.entites.Secteur;
import com.sgifdbackend.demo.parametrage.entites.StructureBeneficiaire;
import com.sgifdbackend.demo.parametrage.entites.TypeCooperation;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_CooperationDecentralisee")
public class CooperationDecentralisee extends EntityBaseBean implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    private String reference;

    private String libelle;

    private  Double montantDevise;
    
    private  Double montant;

    private String observation;

    private String resultats;

    private String defis;

    private String difficultes;

    @ManyToOne
    private DeviseMonnaie deviseMonnaie;
    
    @ManyToOne
    private Annee exercice;

    @ManyToOne
    private Informateur informateur;
    
    @ManyToMany
    private List<Secteur> secteur; 

    @ManyToMany
    private List<DomainePTF> domainePTFs;

    @ManyToMany
    private List<PTFBailleurFrs> ptfBailleurFrs;

    @ManyToOne
    private Pays pays;

    @ManyToOne
    private StructureBeneficiaire structureBeneficiaire;

    @ManyToOne
    private Commune commune;

    @ManyToOne
    private TypeCooperation typeCooperation;

    @ManyToMany
    private List<ProjetProgrammeIdee> projetsElus = new ArrayList<>();

    @ManyToMany
    private List<ProjetProgrammeIdee> projetsSoumis = new ArrayList<>();
    
    
    @OneToMany(mappedBy = "cooperationDecentralisee", cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private List<DBFile> files = new ArrayList<>();
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public Double getMontant() {
		return montant;
	}

	public void setMontant(Double montant) {
		this.montant = montant;
	}

	public String getObservation() {
		return observation;
	}

	public void setObservation(String observation) {
		this.observation = observation;
	}

	public String getResultats() {
		return resultats;
	}

	public void setResultats(String resultats) {
		this.resultats = resultats;
	}

	public String getDefis() {
		return defis;
	}

	public void setDefis(String defis) {
		this.defis = defis;
	}

	public String getDifficultes() {
		return difficultes;
	}

	public void setDifficultes(String difficultes) {
		this.difficultes = difficultes;
	}

	public Annee getExercice() {
		return exercice;
	}

	public void setExercice(Annee exercice) {
		this.exercice = exercice;
	}

	public List<Secteur> getSecteur() {
		return secteur;
	}

	public void setSecteur(List<Secteur> secteur) {
		this.secteur = secteur;
	}

	public List<DomainePTF> getDomainePTFs() {
		return domainePTFs;
	}

	public void setDomainePTFs(List<DomainePTF> domainePTFs) {
		this.domainePTFs = domainePTFs;
	}

	public List<PTFBailleurFrs> getPtfBailleurFrs() {
		return ptfBailleurFrs;
	}

	public void setPtfBailleurFrs(List<PTFBailleurFrs> ptfBailleurFrs) {
		this.ptfBailleurFrs = ptfBailleurFrs;
	}

	public Pays getPays() {
		return pays;
	}

	public void setPays(Pays pays) {
		this.pays = pays;
	}

	public StructureBeneficiaire getStructureBeneficiaire() {
		return structureBeneficiaire;
	}

	public void setStructureBeneficiaire(StructureBeneficiaire structureBeneficiaire) {
		this.structureBeneficiaire = structureBeneficiaire;
	}

	public Commune getCommune() {
		return commune;
	}

	public void setCommune(Commune commune) {
		this.commune = commune;
	}

	public List<ProjetProgrammeIdee> getProjetsElus() {
		return projetsElus;
	}

	public void setProjetsElus(List<ProjetProgrammeIdee> projetsElus) {
		this.projetsElus = projetsElus;
	}

	public List<ProjetProgrammeIdee> getProjetsSoumis() {
		return projetsSoumis;
	}

	public void setProjetsSoumis(List<ProjetProgrammeIdee> projetsSoumis) {
		this.projetsSoumis = projetsSoumis;
	}

	public Informateur getInformateur() {
		return informateur;
	}

	public void setInformateur(Informateur informateur) {
		this.informateur = informateur;
	}

	public TypeCooperation getTypeCooperation() {
		return typeCooperation;
	}

	public void setTypeCooperation(TypeCooperation typeCooperation) {
		this.typeCooperation = typeCooperation;
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
