package com.sgifdbackend.demo.parametrage.entites;


import com.sgifdbackend.demo.accord.entites.Accord;
import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.projet.entities.ConditionSuspensiveAccord;
import com.sgifdbackend.demo.projet.entities.ConditionSuspensiveDecaissement;
import com.sgifdbackend.demo.projet.entities.Localisation;
import com.sgifdbackend.demo.projet.entities.ProrogationProjet;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.projet.entities.RessourceInterieureAnnuelle;
import com.sgifdbackend.demo.projet.entities.SecteurImpacte;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;



import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "t_ProjetProgrammeIdee")
@EntityListeners(AuditingEntityListener.class)
public class ProjetProgrammeIdee extends EntityBaseBean implements Serializable {
	
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    @Column(unique = true)
    private String reference;
    
    @Column(columnDefinition = "boolean default false")
    private boolean isClose = false;
    
    @Column(columnDefinition = "boolean default false")
    //private boolean isValide = true;
    private boolean isValide;

	@Column(unique = true)
    private String libelle;
    
    private String difficultes;
    
    private String solutionEnvisagee;

    private String realisationAudit;

    private String referencesMarche;
    
    private String objectifs;
    
    private String objectifgeneral;

    private Date dateSignatureAccord;

    private Date dateApprobation;

    private Date dateClose;
    
    private String reasonClose;

    private Date dateRactification;

    private Date dateMiseEnVigueur;

    private Date dateDemarrage;

    private Date dateAchevementPrevue;

    private Double nbreProrogation;
    
    private  Double dureeProjet;

    private  Double coutGlobalProjet;

    private  Double contrePartieNationale;

    private  Double coutTotalRessourcesExterieures;

    @ManyToOne
    private Envergure envergure;
    
    @ManyToMany
    private List<TypeRessourceInterieure> typeRessourceInterieures = new ArrayList<>();;
    
    @ManyToOne
    private NiveauMaturite niveaumaturite;

    @ManyToOne
    private DocumentProgrammatique documentProgrammatique;

    @ManyToOne
    private Annee annee;
    
    @ManyToMany
    private List<Accord> accord = new ArrayList<>();

    @ManyToMany
    private List<Annee> dureeAnnees  = new ArrayList<>();

    @OneToMany(mappedBy = "projetProgrammeIdee")
    private List<ConditionSuspensiveDecaissement> conditionSuspensiveDecaissements  = new ArrayList<>();

	@OneToMany(mappedBy = "projetProgrammeIdee")
    private List<RessourceExterieure> ressourceExterieures  = new ArrayList<>();

    @OneToMany(mappedBy = "projetProgrammeIdee")
    private List<RessourceInterieureAnnuelle> ressourceInterieureAnnuelles  = new ArrayList<>();

    @ManyToMany
    private List<Cible> cibles = new ArrayList<>();

    @ManyToMany
    private List<AxePrioritaire> axePrioritaires = new ArrayList<>();

    @ManyToOne
    private StructureBeneficiaire structureSousTutelle;

    @ManyToMany
    private List<StructureBeneficiaire> structureAgenceExecution;

    @ManyToMany
    private List<TypeCooperation> typeCooperations = new ArrayList<>();

    @ManyToOne
    private CategorieProjet categorieProjet;

    @OneToMany(mappedBy = "projetProgrammeIdee")
    private List<ConditionSuspensiveAccord> conditionSuspensiveAccords = new ArrayList<>();

    @OneToMany(mappedBy = "projetProgrammeIdee")
    private List<Localisation> localisations = new ArrayList<>();

    @OneToMany(mappedBy = "projetProgrammeIdee")
    private List<SecteurImpacte> secteurImpactes = new ArrayList<>();

    @OneToMany(mappedBy = "projetProgrammeIdee")
    private List<ProrogationProjet> prorogationProjets = new ArrayList<>();
    
    @OneToMany(mappedBy = "projetProgrammeIdee", cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private List<DBFile> files = new ArrayList<>();

    public ProjetProgrammeIdee() {
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

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public String getDifficultes() {
		return difficultes;
	}

	public void setDifficultes(String difficultes) {
		this.difficultes = difficultes;
	}

	public String getObjectifs() {
		return objectifs;
	}

	public void setObjectifs(String objectifs) {
		this.objectifs = objectifs;
	}

	public NiveauMaturite getNiveaumaturite() {
		return niveaumaturite;
	}

	public void setNiveaumaturite(NiveauMaturite niveaumaturite) {
		this.niveaumaturite = niveaumaturite;
	}

	@JsonIgnore
	public List<Accord> getAccord() {
		return accord;
	}

	public void setAccord(List<Accord> accord) {
		this.accord = accord;
	}

	public void addAccord(Accord accord) {
		this.accord.add(accord);
	}

	public Double getDureeProjet() {
		return dureeProjet;
	}

	public void setDureeProjet(Double dureeProjet) {
		this.dureeProjet = dureeProjet;
	}

	public List<Annee> getDureeAnnees() {
		return dureeAnnees;
	}

	public void setDureeAnnees(List<Annee> dureeAnnees) {
		this.dureeAnnees = dureeAnnees;
	}

	public String getObjectifgeneral() {
		return objectifgeneral;
	}

	public void setObjectifgeneral(String objectifgeneral) {
		this.objectifgeneral = objectifgeneral;
	}

	public Date getDateSignatureAccord() {
		return dateSignatureAccord;
	}

	public void setDateSignatureAccord(Date dateSignatureAccord) {
		this.dateSignatureAccord = dateSignatureAccord;
	}

	public Date getDateApprobation() {
		return dateApprobation;
	}

	public void setDateApprobation(Date dateApprobation) {
		this.dateApprobation = dateApprobation;
	}

	public Date getDateRactification() {
		return dateRactification;
	}

	public void setDateRactification(Date dateRactification) {
		this.dateRactification = dateRactification;
	}

	public Date getDateMiseEnVigueur() {
		return dateMiseEnVigueur;
	}

	public void setDateMiseEnVigueur(Date dateMiseEnVigueur) {
		this.dateMiseEnVigueur = dateMiseEnVigueur;
	}

	public Date getDateDemarrage() {
		return dateDemarrage;
	}

	public void setDateDemarrage(Date dateDemarrage) {
		this.dateDemarrage = dateDemarrage;
	}

	public Date getDateAchevementPrevue() {
		return dateAchevementPrevue;
	}

	public void setDateAchevementPrevue(Date dateAchevementPrevue) {
		this.dateAchevementPrevue = dateAchevementPrevue;
	}

	public Double getNbreProrogation() {
		return nbreProrogation;
	}

	public void setNbreProrogation(Double nbreProrogation) {
		this.nbreProrogation = nbreProrogation;
	}

	public Double getCoutGlobalProjet() {
		return coutGlobalProjet;
	}

	public void setCoutGlobalProjet(Double coutGlobalProjet) {
		this.coutGlobalProjet = coutGlobalProjet;
	}

	public Double getContrePartieNationale() {
		return contrePartieNationale;
	}

	public void setContrePartieNationale(Double contrePartieNationale) {
		this.contrePartieNationale = contrePartieNationale;
	}

	public Double getCoutTotalRessourcesExterieures() {
		return coutTotalRessourcesExterieures;
	}

	public void setCoutTotalRessourcesExterieures(Double coutTotalRessourcesExterieures) {
		this.coutTotalRessourcesExterieures = coutTotalRessourcesExterieures;
	}


	public Annee getAnnee() {
		return annee;
	}

	public void setAnnee(Annee annee) {
		this.annee = annee;
	}

	public List<RessourceExterieure> getRessourceExterieures() {
		return ressourceExterieures;
	}

	public void setRessourceExterieures(List<RessourceExterieure> ressourceExterieures) {
		this.ressourceExterieures = ressourceExterieures;
	}

	public List<RessourceInterieureAnnuelle> getRessourceInterieureAnnuelles() {
		return ressourceInterieureAnnuelles;
	}

	public List<TypeRessourceInterieure> getTypeRessourceInterieures() {
		return typeRessourceInterieures;
	}

	public void setTypeRessourceInterieures(List<TypeRessourceInterieure> typeRessourceInterieures) {
		this.typeRessourceInterieures = typeRessourceInterieures;
	}

	public void setRessourceInterieureAnnuelles(List<RessourceInterieureAnnuelle> ressourceInterieureAnnuelles) {
		this.ressourceInterieureAnnuelles = ressourceInterieureAnnuelles;
	}

	public List<Cible> getCibles() {
		return cibles;
	}

	public void setCibles(List<Cible> cibles) {
		this.cibles = cibles;
	}

	public List<AxePrioritaire> getAxePrioritaires() {
		return axePrioritaires;
	}

	public void setAxePrioritaires(List<AxePrioritaire> axePrioritaires) {
		this.axePrioritaires = axePrioritaires;
	}

	public StructureBeneficiaire getStructureSousTutelle() {
		return structureSousTutelle;
	}

	public void setStructureSousTutelle(StructureBeneficiaire structureSousTutelle) {
		this.structureSousTutelle = structureSousTutelle;
	}

	public List<StructureBeneficiaire> getStructureAgenceExecution() {
		return structureAgenceExecution;
	}

	public void setStructureAgenceExecution(List<StructureBeneficiaire> structureAgenceExecution) {
		this.structureAgenceExecution = structureAgenceExecution;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Envergure getEnvergure() {
		return envergure;
	}

	public void setEnvergure(Envergure envergure) {
		this.envergure = envergure;
	}

	public CategorieProjet getCategorieProjet() {
		return categorieProjet;
	}

	public void setCategorieProjet(CategorieProjet categorieProjet) {
		this.categorieProjet = categorieProjet;
	}

	public List<ConditionSuspensiveAccord> getConditionSuspensiveAccords() {
		return conditionSuspensiveAccords;
	}

	public void setConditionSuspensiveAccords(List<ConditionSuspensiveAccord> conditionSuspensiveAccords) {
		this.conditionSuspensiveAccords = conditionSuspensiveAccords;
	}

	public List<Localisation> getLocalisations() {
		return localisations;
	}

	public void setLocalisations(List<Localisation> localisations) {
		this.localisations = localisations;
	}

	public boolean isClose() {
		return isClose;
	}

	public void setClose(boolean isClose) {
		this.isClose = isClose;
	}

	public List<ConditionSuspensiveDecaissement> getConditionSuspensiveDecaissements() {
		return conditionSuspensiveDecaissements;
	}

	public void setConditionSuspensiveDecaissements(
			List<ConditionSuspensiveDecaissement> conditionSuspensiveDecaissements) {
		this.conditionSuspensiveDecaissements = conditionSuspensiveDecaissements;
	}


	public List<SecteurImpacte> getSecteurImpactes() {
		return secteurImpactes;
	}

	public void setSecteurImpactes(List<SecteurImpacte> secteurImpactes) {
		this.secteurImpactes = secteurImpactes;
	}

	public List<TypeCooperation> getTypeCooperations() {
		return typeCooperations;
	}

	public void setTypeCooperations(List<TypeCooperation> typeCooperations) {
		this.typeCooperations = typeCooperations;
	}

	public boolean isValide() {
		return isValide;
	}

	public void setValide(boolean isValide) {
		this.isValide = isValide;
	}

	public Date getDateClose() {
		return dateClose;
	}

	public void setDateClose(Date dateClose) {
		this.dateClose = dateClose;
	}

	@Override
	public String toString() {
		return "ProjetProgrammeIdee [conditionSuspensiveDecaissements=" + conditionSuspensiveDecaissements
				+ ", ressourceExterieures=" + ressourceExterieures + ", conditionSuspensiveAccords="
				+ conditionSuspensiveAccords + ", localisations=" + localisations + "]";
	}

	public List<DBFile> getFiles() {
		return files;
	}

	public void setFiles(List<DBFile> files) {
		this.files = files;
	}

	public List<ProrogationProjet> getProrogationProjets() {
		return prorogationProjets;
	}

	public void setProrogationProjets(List<ProrogationProjet> prorogationProjets) {
		this.prorogationProjets = prorogationProjets;
	}

	public String getSolutionEnvisagee() {
		return solutionEnvisagee;
	}

	public void setSolutionEnvisagee(String solutionEnvisagee) {
		this.solutionEnvisagee = solutionEnvisagee;
	}

	public String getRealisationAudit() {
		return realisationAudit;
	}

	public void setRealisationAudit(String realisationAudit) {
		this.realisationAudit = realisationAudit;
	}

	public String getReasonClose() {
		return reasonClose;
	}

	public void setReasonClose(String reasonClose) {
		this.reasonClose = reasonClose;
	}

	public DocumentProgrammatique getDocumentProgrammatique() {
		return documentProgrammatique;
	}

	public void setDocumentProgrammatique(DocumentProgrammatique documentProgrammatique) {
		this.documentProgrammatique = documentProgrammatique;
	}

	public String getReferencesMarche() {
		return referencesMarche;
	}

	public void setReferencesMarche(String referencesMarche) {
		this.referencesMarche = referencesMarche;
	}
}
