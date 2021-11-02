package com.sgifdbackend.demo.projet.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.sgifdbackend.demo.parametrage.entites.NatureAssistance;
import com.sgifdbackend.demo.parametrage.entites.NatureFinancement;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.parametrage.entites.TypeAssistance;
import com.sgifdbackend.demo.requetefinancement.entities.RelanceRequeteFinancement;
import com.sgifdbackend.demo.requetefinancement.entities.ReponseRequeteFinancement;
import com.sgifdbackend.demo.requetefinancement.entities.RequeteFinancement;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "t_RessourceExterieure")
public class RessourceExterieure extends EntityBaseBean implements Serializable {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String libelle;
    
    private Boolean isStatusClose = false; 
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCloture; 


    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private ProjetProgrammeIdee projetProgrammeIdee;

	@ManyToOne
    private PTFBailleurFrs ptfBailleurFrs;

    private Double montantRessourceProgrammer;

    private Double montantRessourceDevise;

    @ManyToOne
    private DeviseMonnaie deviseMonnaie;

    @ManyToOne
    private NatureAssistance natureAssistance;

    @ManyToOne
    private TypeAssistance typeAssistance;

    @ManyToOne
    private NatureFinancement natureFinancement;

    @OneToMany(mappedBy = "ressourceExterieure")
    private List<RessourceExterieureAnnuelle> ressourceExterieureAnnuelles  = new ArrayList<>();
    
    @OneToMany(mappedBy = "ressourceExterieure")
    private List<RelanceRequeteFinancement> relanceRequeteFinancements = new ArrayList<>();

    @OneToMany(mappedBy = "ressourceExterieure")
    private List<ReponseRequeteFinancement> reponseRequeteFinancements = new ArrayList<>();

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private RequeteFinancement requeteFinancement;
    
    public RessourceExterieure() {
    }

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

    @JsonIgnore
	public ProjetProgrammeIdee getProjetProgrammeIdee() {
		return projetProgrammeIdee;
	}

	public void setProjetProgrammeIdee(ProjetProgrammeIdee projetProgrammeIdee) {
		this.projetProgrammeIdee = projetProgrammeIdee;
	}

	public PTFBailleurFrs getPtfBailleurFrs() {
		return ptfBailleurFrs;
	}

	public void setPtfBailleurFrs(PTFBailleurFrs ptfBailleurFrs) {
		this.ptfBailleurFrs = ptfBailleurFrs;
	}

	public Double getMontantRessourceDevise() {
		return montantRessourceDevise;
	}

	public void setMontantRessourceDevise(Double montantRessourceDevise) {
		this.montantRessourceDevise = montantRessourceDevise;
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

	public TypeAssistance getTypeAssistance() {
		return typeAssistance;
	}

	public void setTypeAssistance(TypeAssistance typeAssistance) {
		this.typeAssistance = typeAssistance;
	}

	public NatureFinancement getNatureFinancement() {
		return natureFinancement;
	}

	public void setNatureFinancement(NatureFinancement natureFinancement) {
		this.natureFinancement = natureFinancement;
	}

	public List<RessourceExterieureAnnuelle> getRessourceExterieureAnnuelles() {
		return ressourceExterieureAnnuelles;
	}

	public void setRessourceExterieureAnnuelles(List<RessourceExterieureAnnuelle> ressourceExterieureAnnuelles) {
		this.ressourceExterieureAnnuelles = ressourceExterieureAnnuelles;
	}

	public Double getMontantRessourceProgrammer() {
		return montantRessourceProgrammer;
	}

	public void setMontantRessourceProgrammer(Double montantRessourceProgrammer) {
		this.montantRessourceProgrammer = montantRessourceProgrammer;
	}

    @Override
	public String toString() {
		return "RessourceExterieure [id=" + id + ", libelle=" + libelle + "]";
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
	
	@JsonIgnore
	public RequeteFinancement getRequeteFinancement() {
		return requeteFinancement;
	}

	public void setRequeteFinancement(RequeteFinancement requeteFinancement) {
		this.requeteFinancement = requeteFinancement;
	}

	public Boolean getIsStatusClose() {
		return isStatusClose;
	}

	public void setIsStatusClose(Boolean isStatusClose) {
		this.isStatusClose = isStatusClose;
	}

	public Date getDateCloture() {
		return dateCloture;
	}

	public void setDateCloture(Date dateCloture) {
		this.dateCloture = dateCloture;
	}	
	    
	
}
