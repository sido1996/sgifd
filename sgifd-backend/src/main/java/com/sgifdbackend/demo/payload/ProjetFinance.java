package com.sgifdbackend.demo.payload;

import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.sgifdbackend.demo.parametrage.entites.NatureFinancement;

public class ProjetFinance {

	private  Double montantRessourceDevise;
	private Double montantRessourceProgrammer;
	private DeviseMonnaie deviseMonnaie;
	private NatureFinancement natureFinancement;
	private Long id;
	private String reference;
	private String libelle;
	
	
	public ProjetFinance(Double montantRessourceDevise, Double montantRessourceProgrammer, DeviseMonnaie deviseMonnaie,
			NatureFinancement natureFinancement, Long id, String reference, String libelle) {
		super();
		this.montantRessourceDevise = montantRessourceDevise;
		this.montantRessourceProgrammer = montantRessourceProgrammer;
		this.deviseMonnaie = deviseMonnaie;
		this.natureFinancement = natureFinancement;
		this.id = id;
		this.reference = reference;
		this.libelle = libelle;
	}
	
	public double getMontantRessourceDevise() {
		return montantRessourceDevise;
	}
	public void setMontantRessourceDevise(double montantRessourceDevise) {
		this.montantRessourceDevise = montantRessourceDevise;
	}
	public double getMontantRessourceProgrammer() {
		return montantRessourceProgrammer;
	}
	public void setMontantRessourceProgrammer(double montantRessourceProgrammer) {
		this.montantRessourceProgrammer = montantRessourceProgrammer;
	}
	public DeviseMonnaie getDeviseMonnaie() {
		return deviseMonnaie;
	}
	public void setDeviseMonnaie(DeviseMonnaie deviseMonnaie) {
		this.deviseMonnaie = deviseMonnaie;
	}
	public NatureFinancement getNatureFinancement() {
		return natureFinancement;
	}
	public void setNatureFinancement(NatureFinancement natureFinancement) {
		this.natureFinancement = natureFinancement;
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

	@Override
	public String toString() {
		return "ProjetFinance [montantRessourceDevise=" + montantRessourceDevise + ", montantRessourceProgrammer="
				+ montantRessourceProgrammer + ", deviseMonnaie=" + deviseMonnaie + ", natureFinancement="
				+ natureFinancement + ", id=" + id + ", reference=" + reference + ", libelle=" + libelle
				+ ", getMontantRessourceDevise()=" + getMontantRessourceDevise() + ", getMontantRessourceProgrammer()="
				+ getMontantRessourceProgrammer() + ", getDeviseMonnaie()=" + getDeviseMonnaie()
				+ ", getNatureFinancement()=" + getNatureFinancement() + ", getId()=" + getId() + ", getReference()="
				+ getReference() + ", getLibelle()=" + getLibelle() + ", getClass()=" + getClass() + ", hashCode()="
				+ hashCode() + ", toString()=" + super.toString() + "]";
	}
	
	
	
}
