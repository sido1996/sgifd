package com.sgifdbackend.demo.commission_mixte_dsp.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.sgifdbackend.demo.parametrage.entites.DomainePTF;
import com.sgifdbackend.demo.parametrage.entites.ODD;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.parametrage.entites.SousSecteur;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

@Entity
@Table(name = "t_CommisionMixteDSP")
public class CommissionMixteDSP extends EntityBaseBean implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	

	@Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    private String libelle;

    private  Double montantPrevisionnelDevise;
    
    private  Double montantPrevisionnelFcfa;

    private String lieuDerniereCommission;

    private String obligations;
    
    private String recommandation;
    
    private Date dateApprobation;
    
    private String  periodicite ;
    
    private String dateOrAnneeDebutPeriode ;
    
    private String dateOrAnneeFinPeriode;
   
    @ManyToOne
    private DeviseMonnaie deviseMonnaie;
    
    @ManyToMany
    private List<SousSecteur> sousSecteurs  = new ArrayList<>();
    
    @ManyToMany
    private List<ODD> odd  = new ArrayList<>();
    
    @ManyToOne
    private PTFBailleurFrs institutionsPtf ;
    
    @ManyToMany
    private List<DomainePTF> domaines  = new ArrayList<>();
    
    @ManyToMany
    private List<ProjetProgrammeIdee> projetProgrammeIdees  = new ArrayList<>();

    @OneToMany(mappedBy = "commissionMixteDSP")
    private List<AxePrioritaireCommission> axePrioritaireCommissions  = new ArrayList<>();
    
    @OneToMany(mappedBy = "commissionMixteDSP", cascade= {CascadeType.PERSIST, CascadeType.MERGE})
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

	public Double getMontantPrevisionnelDevise() {
		return montantPrevisionnelDevise;
	}

	public void setMontantPrevisionnelDevise(Double montantPrevisionnelDevise) {
		this.montantPrevisionnelDevise = montantPrevisionnelDevise;
	}

	public Double getMontantPrevisionnelFcfa() {
		return montantPrevisionnelFcfa;
	}

	public void setMontantPrevisionnelFcfa(Double montantPrevisionnelFcfa) {
		this.montantPrevisionnelFcfa = montantPrevisionnelFcfa;
	}

	public String getLieuDerniereCommission() {
		return lieuDerniereCommission;
	}

	public void setLieuDerniereCommission(String lieuDerniereCommission) {
		this.lieuDerniereCommission = lieuDerniereCommission;
	}

	public String getObligations() {
		return obligations;
	}

	public void setObligations(String obligations) {
		this.obligations = obligations;
	}

	public String getRecommandation() {
		return recommandation;
	}

	public void setRecommandation(String recommandation) {
		this.recommandation = recommandation;
	}

	public Date getDateApprobation() {
		return dateApprobation;
	}

	public void setDateApprobation(Date dateApprobation) {
		this.dateApprobation = dateApprobation;
	}

	public String getPeriodicite() {
		return periodicite;
	}

	public void setPeriodicite(String periodicite) {
		this.periodicite = periodicite;
	}

	public String getDateOrAnneeDebutPeriode() {
		return dateOrAnneeDebutPeriode;
	}

	public void setDateOrAnneeDebutPeriode(String dateOrAnneeDebutPeriode) {
		this.dateOrAnneeDebutPeriode = dateOrAnneeDebutPeriode;
	}

	public String getDateOrAnneeFinPeriode() {
		return dateOrAnneeFinPeriode;
	}

	public void setDateOrAnneeFinPeriode(String dateOrAnneeFinPeriode) {
		this.dateOrAnneeFinPeriode = dateOrAnneeFinPeriode;
	}

	public DeviseMonnaie getDeviseMonnaie() {
		return deviseMonnaie;
	}

	public void setDeviseMonnaie(DeviseMonnaie deviseMonnaie) {
		this.deviseMonnaie = deviseMonnaie;
	}

	public List<SousSecteur> getSousSecteurs() {
		return sousSecteurs;
	}

	public void setSousSecteurs(List<SousSecteur> sousSecteurs) {
		this.sousSecteurs = sousSecteurs;
	}

	public List<ODD> getOdd() {
		return odd;
	}

	public void setOdd(List<ODD> odd) {
		this.odd = odd;
	}

	public PTFBailleurFrs getInstitutionsPtf() {
		return institutionsPtf;
	}

	public void setInstitutionsPtf(PTFBailleurFrs institutionsPtf) {
		this.institutionsPtf = institutionsPtf;
	}

	public List<DomainePTF> getDomaines() {
		return domaines;
	}

	public void setDomaines(List<DomainePTF> domaines) {
		this.domaines = domaines;
	}

	public List<ProjetProgrammeIdee> getProjetProgrammeIdees() {
		return projetProgrammeIdees;
	}

	public void setProjetProgrammeIdees(List<ProjetProgrammeIdee> projetProgrammeIdees) {
		this.projetProgrammeIdees = projetProgrammeIdees;
	}

	public List<AxePrioritaireCommission> getAxePrioritaireCommissions() {
		return axePrioritaireCommissions;
	}

	public void setAxePrioritaireCommissions(List<AxePrioritaireCommission> axePrioritaireCommissions) {
		this.axePrioritaireCommissions = axePrioritaireCommissions;
	}

	public List<DBFile> getFiles() {
		return files;
	}

	public void setFiles(List<DBFile> files) {
		this.files = files;
	}
   
}
