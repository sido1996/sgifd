package com.sgifdbackend.demo.fondspecifique.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.Commune;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.sgifdbackend.demo.parametrage.entites.DomainePTF;
import com.sgifdbackend.demo.parametrage.entites.GrandSecteur;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.Pays;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.parametrage.entites.Promoteur;
import com.sgifdbackend.demo.parametrage.entites.Secteur;
import com.sgifdbackend.demo.parametrage.entites.SousSecteur;
import com.sgifdbackend.demo.parametrage.entites.StructureBeneficiaire;
import com.sgifdbackend.demo.parametrage.entites.TypeFondSpecifique;
import com.sgifdbackend.demo.parametrage.entites.ZoneLocalite;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_FondSpecifique")
public class FondSpecifique extends EntityBaseBean implements Serializable {
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

    private  Double montantFcfa;

    private String observations;

    private String difficultes;

    private String solutionsEnvisagees;

    private String objectifs;

    @ManyToOne
    private Annee exercice;

    @ManyToOne
    private TypeFondSpecifique typeFondSpecifique;

    @ManyToOne
    private DeviseMonnaie deviseMonnaie;


    @ManyToOne
    private GrandSecteur grandSecteur;

    @ManyToOne
    private Secteur secteur;

    @ManyToMany
    private List<SousSecteur> sousSecteurs = new ArrayList<>();

    @ManyToMany
    private List<PTFBailleurFrs> ptfBailleurFrs = new ArrayList<>();

    @OneToMany(mappedBy = "fondSpecifique")
    private List<DetailFondSpecifique> detailFondSpecifiques = new ArrayList<>();
    
    @OneToMany(mappedBy = "fondSpecifique", cascade= {CascadeType.PERSIST, CascadeType.MERGE})
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

	public Double getMontantDevise() {
		return montantDevise;
	}

	public void setMontantDevise(Double montantDevise) {
		this.montantDevise = montantDevise;
	}

	public Double getMontantFcfa() {
		return montantFcfa;
	}

	public void setMontantFcfa(Double montantFcfa) {
		this.montantFcfa = montantFcfa;
	}

	public String getObservations() {
		return observations;
	}

	public void setObservations(String observations) {
		this.observations = observations;
	}	

	public String getDifficultes() {
		return difficultes;
	}

	public void setDifficultes(String difficultes) {
		this.difficultes = difficultes;
	}

	public String getSolutionsEnvisagees() {
		return solutionsEnvisagees;
	}

	public void setSolutionsEnvisagees(String solutionsEnvisagees) {
		this.solutionsEnvisagees = solutionsEnvisagees;
	}

	public String getObjectifs() {
		return objectifs;
	}

	public void setObjectifs(String objectifs) {
		this.objectifs = objectifs;
	}

	public Annee getExercice() {
		return exercice;
	}

	public void setExercice(Annee exercice) {
		this.exercice = exercice;
	}

	
	public TypeFondSpecifique getTypeFondSpecifique() {
		return typeFondSpecifique;
	}

	public void setTypeFondSpecifique(TypeFondSpecifique typeFondSpecifique) {
		this.typeFondSpecifique = typeFondSpecifique;
	}

	public DeviseMonnaie getDeviseMonnaie() {
		return deviseMonnaie;
	}

	public void setDeviseMonnaie(DeviseMonnaie deviseMonnaie) {
		this.deviseMonnaie = deviseMonnaie;
	}


	public List<PTFBailleurFrs> getPtfBailleurFrs() {
		return ptfBailleurFrs;
	}

	public void setPtfBailleurFrs(List<PTFBailleurFrs> ptfBailleurFrs) {
		this.ptfBailleurFrs = ptfBailleurFrs;
	}

	public List<DetailFondSpecifique> getDetailFondSpecifiques() {
		return detailFondSpecifiques;
	}

	public void setDetailFondSpecifiques(List<DetailFondSpecifique> detailFondSpecifiques) {
		this.detailFondSpecifiques = detailFondSpecifiques;
	}

	public List<DBFile> getFiles() {
		return files;
	}

	public void setFiles(List<DBFile> files) {
		this.files = files;
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

	public List<SousSecteur> getSousSecteurs() {
		return sousSecteurs;
	}

	public void setSousSecteurs(List<SousSecteur> sousSecteurs) {
		this.sousSecteurs = sousSecteurs;
	}
	
}
