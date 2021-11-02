package com.sgifdbackend.demo.accord.entites;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.*;


import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Entity
@Table(name = "t_Acccord")
public class Accord extends EntityBaseBean implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String reference;
    
    
    private String intitule;

    private Date dateSignature;
    
    private Date dateRatification;
    
    private Date dateFinAccord;
    
    private Date dateDeMiseEnVigueurPtf;
    
    private  Double contrePartieNationale;
    
    private  Double apportPtf;
    
    private  Double apportPtfDevise;

    private  Double montant;

    private String nomDuSignataire;
    
    private String lieuDuSignature;

    private  Double dureeAccord;

    @ManyToOne
    private StatusAccord statusAccord;
    
    private  Double montantDevise;
    
    private String categorie;
    
    private String depositaire;
    
    private String retombees;
    
    private String avenants;

    @ManyToOne
    private DeviseMonnaie deviseMonnaie;
    
    @ManyToOne
    private Annee annee;
    
    @ManyToOne
    private TypeAccord typeAccord;
    
    @ManyToMany
    private List<PTFBailleurFrs> ptfBailleurFrs;

    @ManyToOne
    private NatureFinancement natureFinancement;
    
    @ManyToOne
    private NatureAssistance natureAssistance;


    @ManyToOne
    private Envergure envergure;
   
    @ManyToMany
    private List<SousSecteur> sousSecteurs;
    

    @ManyToMany
    private List<ODD> odds;

    @ManyToMany
    private List<PilierPAG> pilierPAGs;
    
    @ManyToOne
    private StructureBeneficiaire structureBeneficiaire;
    
    @ManyToMany
    private List<ProjetProgrammeIdee> projetProgrammeIdees = new ArrayList<>();

    @OneToMany(mappedBy = "accord")
    private List<ConditionSuspensiveUnDecaissement> conditionSuspensiveUnDecaissements = new ArrayList<>();
    
    @OneToMany(mappedBy = "accord", cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private List<DBFile> files = new ArrayList<>();

    public Accord() {
    }


	public String getDepositaire() {
		return depositaire;
	}


	public void setDepositaire(String depositaire) {
		this.depositaire = depositaire;
	}


	public String getLieuDuSignature() {
		return lieuDuSignature;
	}


	public void setLieuDuSignature(String lieuDuSignature) {
		this.lieuDuSignature = lieuDuSignature;
	}


	public Double getApportPtfDevise() {
		return apportPtfDevise;
	}


	public void setApportPtfDevise(Double apportPtfDevise) {
		this.apportPtfDevise = apportPtfDevise;
	}


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

	public String getIntitule() {
		return intitule;
	}

	public void setIntitule(String intitule) {
		this.intitule = intitule;
	}

	public Date getDateSignature() {
		return dateSignature;
	}

	public void setDateSignature(Date dateSignature) {
		this.dateSignature = dateSignature;
	}

	public Annee getAnnee() {
		return annee;
	}

	public void setAnnee(Annee annee) {
		this.annee = annee;
	}
	
	

	public String getCategorie() {
		return categorie;
	}


	public void setCategorie(String categorie) {
		this.categorie = categorie;
	}


	public TypeAccord getTypeAccord() {
		return typeAccord;
	}

	public void setTypeAccord(TypeAccord typeAccord) {
		this.typeAccord = typeAccord;
	}

	

	public List<PTFBailleurFrs> getPtfBailleurFrs() {
		return ptfBailleurFrs;
	}


	public void setPtfBailleurFrs(List<PTFBailleurFrs> ptfBailleurFrs) {
		this.ptfBailleurFrs = ptfBailleurFrs;
	}


	public NatureFinancement getNatureFinancement() {
		return natureFinancement;
	}

	public void setNatureFinancement(NatureFinancement natureFinancement) {
		this.natureFinancement = natureFinancement;
	}

	public Envergure getEnvergure() {
		return envergure;
	}

	public void setEnvergure(Envergure envergure) {
		this.envergure = envergure;
	}

	public List<SousSecteur> getSousSecteurs() {
		return sousSecteurs;
	}

	public void setSousSecteurs(List<SousSecteur> sousSecteurs) {
		this.sousSecteurs = sousSecteurs;
	}

	public List<ODD> getOdds() {
		return odds;
	}

	public void setOdds(List<ODD> odds) {
		this.odds = odds;
	}

	public List<PilierPAG> getPilierPAGs() {
		return pilierPAGs;
	}

	public void setPilierPAGs(List<PilierPAG> pilierPAGs) {
		this.pilierPAGs = pilierPAGs;
	}

	public StructureBeneficiaire getStructureBeneficiaire() {
		return structureBeneficiaire;
	}

	public void setStructureBeneficiaire(StructureBeneficiaire structureBeneficiaire) {
		this.structureBeneficiaire = structureBeneficiaire;
	}

	public List<ProjetProgrammeIdee> getProjetProgrammeIdees() {
		return projetProgrammeIdees;
	}

	public void setProjetProgrammeIdees(List<ProjetProgrammeIdee> projetProgrammeIdees) {
		this.projetProgrammeIdees = projetProgrammeIdees;
	}

	public List<ConditionSuspensiveUnDecaissement> getConditionSuspensiveUnDecaissements() {
		return conditionSuspensiveUnDecaissements;
	}

	public void setConditionSuspensiveUnDecaissements(
			List<ConditionSuspensiveUnDecaissement> conditionSuspensiveUnDecaissements) {
		this.conditionSuspensiveUnDecaissements = conditionSuspensiveUnDecaissements;
	}

	public Double getMontant() {
		return montant;
	}

	public void setMontant(Double montant) {
		this.montant = montant;
	}

	public List<DBFile> getFiles() {
		return files;
	}

	public void setFiles(List<DBFile> files) {
		this.files = files;
	}


	public NatureAssistance getNatureAssistance() {
		return natureAssistance;
	}


	public void setNatureAssistance(NatureAssistance natureAssistance) {
		this.natureAssistance = natureAssistance;
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


	public Date getDateRatification() {
		return dateRatification;
	}


	public void setDateRatification(Date dateRatification) {
		this.dateRatification = dateRatification;
	}


	public Date getDateFinAccord() {
		return dateFinAccord;
	}


	public void setDateFinAccord(Date dateFinAccord) {
		this.dateFinAccord = dateFinAccord;
	}


	public Date getDateDeMiseEnVigueurPtf() {
		return dateDeMiseEnVigueurPtf;
	}


	public void setDateDeMiseEnVigueurPtf(Date dateDeMiseEnVigueurPtf) {
		this.dateDeMiseEnVigueurPtf = dateDeMiseEnVigueurPtf;
	}


	public Double getContrePartieNationale() {
		return contrePartieNationale;
	}


	public void setContrePartieNationale(Double contrePartieNationale) {
		this.contrePartieNationale = contrePartieNationale;
	}


	public Double getApportPtf() {
		return apportPtf;
	}


	public void setApportPtf(Double apportPtf) {
		this.apportPtf = apportPtf;
	}


	public String getNomDuSignataire() {
		return nomDuSignataire;
	}


	public void setNomDuSignataire(String nomDuSignataire) {
		this.nomDuSignataire = nomDuSignataire;
	}


	public StatusAccord getStatusAccord() {
		return statusAccord;
	}


	public void setStatusAccord(StatusAccord statusAccord) {
		this.statusAccord = statusAccord;
	}


	public Double getDureeAccord() {
		return dureeAccord;
	}


	public void setDureeAccord(Double dureeAccord) {
		this.dureeAccord = dureeAccord;
	}


	public String getRetombees() {
		return retombees;
	}


	public void setRetombees(String retombees) {
		this.retombees = retombees;
	}


	public String getAvenants() {
		return avenants;
	}


	public void setAvenants(String avenants) {
		this.avenants = avenants;
	}	
    
}
