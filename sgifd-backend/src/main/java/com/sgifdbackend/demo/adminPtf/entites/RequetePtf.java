package com.sgifdbackend.demo.adminPtf.entites;

import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.sgifdbackend.demo.parametrage.entites.NatureAssistance;
import com.sgifdbackend.demo.parametrage.entites.NatureFinancement;

public class RequetePtf {
	
	private Long idR;
	private Double montantRessourceDevise;
	private Double montantRessourceProgrammer;
	private DeviseMonnaie deviseMonnaie;
	private NatureAssistance natureAssistance;
	private NatureFinancement natureFinancement;
	private Long idP;
	private String libelle;
	private String objectifgeneral;
	private String objectifs;
	private Annee annee;
	
	
	public Long getIdR() {
		return idR;
	}
	public void setIdR(Long idR) {
		this.idR = idR;
	}
	public Double getMontantRessourceDevise() {
		return montantRessourceDevise;
	}
	public void setMontantRessourceDevise(Double montantRessourceDevise) {
		this.montantRessourceDevise = montantRessourceDevise;
	}
	public Double getMontantRessourceProgrammer() {
		return montantRessourceProgrammer;
	}
	public void setMontantRessourceProgrammer(Double montantRessourceProgrammer) {
		this.montantRessourceProgrammer = montantRessourceProgrammer;
	}
	public DeviseMonnaie getDeviseMonnaie() {
		return deviseMonnaie;
	}
	public void setDeviseMonnaie(DeviseMonnaie deviseMonnaie) {
		this.deviseMonnaie = deviseMonnaie;
	}
	public NatureAssistance getNatureAssistance() {
		return natureAssistance;
	}
	public void setNatureAssistance(NatureAssistance natureAssistance) {
		this.natureAssistance = natureAssistance;
	}
	public NatureFinancement getNatureFinancement() {
		return natureFinancement;
	}
	public void setNatureFinancement(NatureFinancement natureFinancement) {
		this.natureFinancement = natureFinancement;
	}	
	
	public Long getIdP() {
		return idP;
	}
	public void setIdP(Long idP) {
		this.idP = idP;
	}
	public String getLibelle() {
		return libelle;
	}
	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
	public String getObjectifgeneral() {
		return objectifgeneral;
	}
	public void setObjectifgeneral(String objectifgeneral) {
		this.objectifgeneral = objectifgeneral;
	}
	public String getObjectifs() {
		return objectifs;
	}
	public void setObjectifs(String objectifs) {
		this.objectifs = objectifs;
	}
	public Annee getAnnee() {
		return annee;
	}
	public void setAnnee(Annee annee) {
		this.annee = annee;
	}
	

}
