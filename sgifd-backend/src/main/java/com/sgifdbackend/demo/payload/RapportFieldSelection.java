package com.sgifdbackend.demo.payload;

import java.util.ArrayList;
import java.util.List;

import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.Arrondissement;
import com.sgifdbackend.demo.parametrage.entites.AxePrioritaire;
import com.sgifdbackend.demo.parametrage.entites.CategoriePTF;
import com.sgifdbackend.demo.parametrage.entites.Cible;
import com.sgifdbackend.demo.parametrage.entites.Commune;
import com.sgifdbackend.demo.parametrage.entites.Departement;
import com.sgifdbackend.demo.parametrage.entites.DomainePTF;
import com.sgifdbackend.demo.parametrage.entites.Envergure;
import com.sgifdbackend.demo.parametrage.entites.GrandSecteur;
import com.sgifdbackend.demo.parametrage.entites.NatureAssistance;
import com.sgifdbackend.demo.parametrage.entites.NatureFinancement;
import com.sgifdbackend.demo.parametrage.entites.NiveauMaturite;
import com.sgifdbackend.demo.parametrage.entites.ODD;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.Pays;
import com.sgifdbackend.demo.parametrage.entites.PilierPAG;
import com.sgifdbackend.demo.parametrage.entites.Secteur;
import com.sgifdbackend.demo.parametrage.entites.SousSecteur;
import com.sgifdbackend.demo.parametrage.entites.StructureBeneficiaire;
import com.sgifdbackend.demo.parametrage.entites.TypeAccord;
import com.sgifdbackend.demo.parametrage.entites.TypeCooperation;
import com.sgifdbackend.demo.parametrage.entites.TypeFondSpecifique;
import com.sgifdbackend.demo.parametrage.entites.TypeRessourceInterieure;

public class RapportFieldSelection {
	
    private List<Pays> paysList= new ArrayList<>();
    
    private List<Arrondissement> arrondissementList= new ArrayList<>();
    
    private List<AxePrioritaire> axePrioritaireList= new ArrayList<>();
    
    private List<CategoriePTF> categoriePTFList= new ArrayList<>();
    
    private List<Cible> cibleList= new ArrayList<>();
    
    private List<DomainePTF> domainePTFList= new ArrayList<>();
    
    private List<GrandSecteur> grandSecteurList= new ArrayList<>();
    
    private List<NatureAssistance> natureAssistanceList= new ArrayList<>();
    
    private List<NatureFinancement> natureFinancementList= new ArrayList<>();
    
    private List<NiveauMaturite> niveauMaturiteList= new ArrayList<>();
    
    private List<ODD> oDDList= new ArrayList<>();
    
    private List<PilierPAG> pilierPAGList= new ArrayList<>();
    
    private List<PTFBailleurFrs> pTFBailleurFrsList= new ArrayList<>();
    
    private List<Secteur> secteurList= new ArrayList<>();
    
    private List<SousSecteur> sousSecteurList= new ArrayList<>();
    
    private List<StructureBeneficiaire> structureBeneficiaireList= new ArrayList<>();
    
    private List<TypeAccord> typeAccordList= new ArrayList<>();
    
    private List<TypeCooperation> typeCooperationList= new ArrayList<>();
    
    private List<TypeFondSpecifique> typeFondSpecifiqueList= new ArrayList<>();
    
    private List<TypeRessourceInterieure> typeRessourceInterieureList= new ArrayList<>();

    private List<Envergure> envergureList= new ArrayList<>();

    private List<Departement> departementList= new ArrayList<>();

    private List<Commune> communeList= new ArrayList<>();

    private List<Annee> exerciceList= new ArrayList<>();

	public List<Pays> getPaysList() {
		return paysList;
	}

	public void setPaysList(List<Pays> paysList) {
		this.paysList = paysList;
	}

	public List<Arrondissement> getArrondissementList() {
		return arrondissementList;
	}

	public void setArrondissementList(List<Arrondissement> arrondissementList) {
		this.arrondissementList = arrondissementList;
	}

	public List<AxePrioritaire> getAxePrioritaireList() {
		return axePrioritaireList;
	}

	public void setAxePrioritaireList(List<AxePrioritaire> axePrioritaireList) {
		this.axePrioritaireList = axePrioritaireList;
	}

	public List<CategoriePTF> getCategoriePTFList() {
		return categoriePTFList;
	}

	public void setCategoriePTFList(List<CategoriePTF> categoriePTFList) {
		this.categoriePTFList = categoriePTFList;
	}

	public List<Cible> getCibleList() {
		return cibleList;
	}

	public void setCibleList(List<Cible> cibleList) {
		this.cibleList = cibleList;
	}

	public List<DomainePTF> getDomainePTFList() {
		return domainePTFList;
	}

	public void setDomainePTFList(List<DomainePTF> domainePTFList) {
		this.domainePTFList = domainePTFList;
	}

	public List<GrandSecteur> getGrandSecteurList() {
		return grandSecteurList;
	}

	public void setGrandSecteurList(List<GrandSecteur> grandSecteurList) {
		this.grandSecteurList = grandSecteurList;
	}

	public List<NatureAssistance> getNatureAssistanceList() {
		return natureAssistanceList;
	}

	public void setNatureAssistanceList(List<NatureAssistance> natureAssistanceList) {
		this.natureAssistanceList = natureAssistanceList;
	}

	public List<NatureFinancement> getNatureFinancementList() {
		return natureFinancementList;
	}

	public void setNatureFinancementList(List<NatureFinancement> natureFinancementList) {
		this.natureFinancementList = natureFinancementList;
	}

	public List<NiveauMaturite> getNiveauMaturiteList() {
		return niveauMaturiteList;
	}

	public void setNiveauMaturiteList(List<NiveauMaturite> niveauMaturiteList) {
		this.niveauMaturiteList = niveauMaturiteList;
	}

	public List<ODD> getoDDList() {
		return oDDList;
	}

	public void setoDDList(List<ODD> oDDList) {
		this.oDDList = oDDList;
	}

	public List<PilierPAG> getPilierPAGList() {
		return pilierPAGList;
	}

	public void setPilierPAGList(List<PilierPAG> pilierPAGList) {
		this.pilierPAGList = pilierPAGList;
	}

	public List<PTFBailleurFrs> getpTFBailleurFrsList() {
		return pTFBailleurFrsList;
	}

	public void setpTFBailleurFrsList(List<PTFBailleurFrs> pTFBailleurFrsList) {
		this.pTFBailleurFrsList = pTFBailleurFrsList;
	}

	public List<Secteur> getSecteurList() {
		return secteurList;
	}

	public void setSecteurList(List<Secteur> secteurList) {
		this.secteurList = secteurList;
	}

	public List<SousSecteur> getSousSecteurList() {
		return sousSecteurList;
	}

	public void setSousSecteurList(List<SousSecteur> sousSecteurList) {
		this.sousSecteurList = sousSecteurList;
	}

	public List<StructureBeneficiaire> getStructureBeneficiaireList() {
		return structureBeneficiaireList;
	}

	public void setStructureBeneficiaireList(List<StructureBeneficiaire> structureBeneficiaireList) {
		this.structureBeneficiaireList = structureBeneficiaireList;
	}

	public List<TypeAccord> getTypeAccordList() {
		return typeAccordList;
	}

	public void setTypeAccordList(List<TypeAccord> typeAccordList) {
		this.typeAccordList = typeAccordList;
	}

	public List<TypeCooperation> getTypeCooperationList() {
		return typeCooperationList;
	}

	public void setTypeCooperationList(List<TypeCooperation> typeCooperationList) {
		this.typeCooperationList = typeCooperationList;
	}

	public List<TypeRessourceInterieure> getTypeRessourceInterieureList() {
		return typeRessourceInterieureList;
	}

	public void setTypeRessourceInterieureList(List<TypeRessourceInterieure> typeRessourceInterieureList) {
		this.typeRessourceInterieureList = typeRessourceInterieureList;
	}

	public List<Envergure> getEnvergureList() {
		return envergureList;
	}

	public void setEnvergureList(List<Envergure> envergureList) {
		this.envergureList = envergureList;
	}

	public List<TypeFondSpecifique> getTypeFondSpecifiqueList() {
		return typeFondSpecifiqueList;
	}

	public void setTypeFondSpecifiqueList(List<TypeFondSpecifique> typeFondSpecifiqueList) {
		this.typeFondSpecifiqueList = typeFondSpecifiqueList;
	}

	public List<Departement> getDepartementList() {
		return departementList;
	}

	public void setDepartementList(List<Departement> departementList) {
		this.departementList = departementList;
	}

	public List<Commune> getCommuneList() {
		return communeList;
	}

	public void setCommuneList(List<Commune> communeList) {
		this.communeList = communeList;
	}

	public List<Annee> getExerciceList() {
		return exerciceList;
	}

	public void setExerciceList(List<Annee> exerciceList) {
		this.exerciceList = exerciceList;
	}
    
}
