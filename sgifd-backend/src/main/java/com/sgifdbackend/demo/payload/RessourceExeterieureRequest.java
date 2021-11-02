package com.sgifdbackend.demo.payload;


import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;
import com.sgifdbackend.demo.projet.entities.RessourceExterieureAnnuelle;
import com.sgifdbackend.demo.requetefinancement.entities.RelanceRequeteFinancement;
import com.sgifdbackend.demo.requetefinancement.entities.ReponseRequeteFinancement;
import com.sgifdbackend.demo.requetefinancement.entities.RequeteFinancement;
import com.sgifdbackend.demo.security.entities.AccreditatedUser;
import com.sgifdbackend.demo.security.entities.ModuleUser;
import com.sgifdbackend.demo.security.entities.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

public class RessourceExeterieureRequest {
	
 private RessourceExterieure ressourceExterieure;
    private ProjetProgrammeIdee projetProgrammeIdee;

    private List<RessourceExterieureAnnuelle> ressourceExterieureAnnuelles  = new ArrayList<>();
    
    private List<RelanceRequeteFinancement> relanceRequeteFinancements = new ArrayList<>();

    private List<ReponseRequeteFinancement> reponseRequeteFinancements = new ArrayList<>();

    private RequeteFinancement requeteFinancement;

	public RessourceExterieure getRessourceExterieure() {
		return ressourceExterieure;
	}

	public void setRessourceExterieure(RessourceExterieure ressourceExterieure) {
		this.ressourceExterieure = ressourceExterieure;
	}

	public ProjetProgrammeIdee getProjetProgrammeIdee() {
		return projetProgrammeIdee;
	}

	public void setProjetProgrammeIdee(ProjetProgrammeIdee projetProgrammeIdee) {
		this.projetProgrammeIdee = projetProgrammeIdee;
	}

	public List<RessourceExterieureAnnuelle> getRessourceExterieureAnnuelles() {
		return ressourceExterieureAnnuelles;
	}

	public void setRessourceExterieureAnnuelles(List<RessourceExterieureAnnuelle> ressourceExterieureAnnuelles) {
		this.ressourceExterieureAnnuelles = ressourceExterieureAnnuelles;
	}

	public List<RelanceRequeteFinancement> getRelanceRequeteFinancements() {
		return relanceRequeteFinancements;
	}

	public void setRelanceRequeteFinancements(List<RelanceRequeteFinancement> relanceRequeteFinancements) {
		this.relanceRequeteFinancements = relanceRequeteFinancements;
	}

	public List<ReponseRequeteFinancement> getReponseRequeteFinancements() {
		return reponseRequeteFinancements;
	}

	public void setReponseRequeteFinancements(List<ReponseRequeteFinancement> reponseRequeteFinancements) {
		this.reponseRequeteFinancements = reponseRequeteFinancements;
	}

	public RequeteFinancement getRequeteFinancement() {
		return requeteFinancement;
	}

	public void setRequeteFinancement(RequeteFinancement requeteFinancement) {
		this.requeteFinancement = requeteFinancement;
	}

    
}
