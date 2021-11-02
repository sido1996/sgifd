package com.sgifdbackend.demo.requetefinancement.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.Cible;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.parametrage.entites.StructureBeneficiaire;
import com.sgifdbackend.demo.parametrage.entites.TypeAppreciation;
import com.sgifdbackend.demo.projet.entities.RessourceExterieure;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "t_RequeteFinancement")
public class RequeteFinancement extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateEnvoiRequete = new Date();

    private Date dateMissionPreparation;

    private String aideMemoireMission;
    
    private Boolean isStatusClose = false; 

    private Date dateClose;

    private String closeAppreciation;

    private String closeReason;

    @ManyToOne
    private ProjetProgrammeIdee projetProgrammeIdee ;

    @ManyToOne
    private TypeAppreciation typeAppreciation ;
    
    @OneToMany(mappedBy = "requeteFinancement", cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private List<DBFile> files = new ArrayList<>();
    
    @OneToMany(mappedBy = "requeteFinancement", cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private List<RessourceExterieure> ressourceExterieures = new ArrayList<>();

    @OneToMany(mappedBy = "requeteFinancement", cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private List<InstructionRequete> instructionRequetes = new ArrayList<>();
    
    public RequeteFinancement() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDateEnvoiRequete() {
		return dateEnvoiRequete;
	}

	public void setDateEnvoiRequete(Date dateEnvoiRequete) {
		this.dateEnvoiRequete = dateEnvoiRequete;
	}

	public Date getDateMissionPreparation() {
		return dateMissionPreparation;
	}

	public void setDateMissionPreparation(Date dateMissionPreparation) {
		this.dateMissionPreparation = dateMissionPreparation;
	}

	public String getAideMemoireMission() {
		return aideMemoireMission;
	}

	public void setAideMemoireMission(String aideMemoireMission) {
		this.aideMemoireMission = aideMemoireMission;
	}

	public Boolean getIsStatusClose() {
		return isStatusClose;
	}

	public void setIsStatusClose(Boolean isStatusClose) {
		this.isStatusClose = isStatusClose;
	}
	
	public Date getDateClose() {
		return dateClose;
	}

	public void setDateClose(Date dateClose) {
		this.dateClose = dateClose;
	}

	public String getCloseAppreciation() {
		return closeAppreciation;
	}

	public void setCloseAppreciation(String closeAppreciation) {
		this.closeAppreciation = closeAppreciation;
	}

	public String getCloseReason() {
		return closeReason;
	}

	public void setCloseReason(String closeReason) {
		this.closeReason = closeReason;
	}

	public TypeAppreciation getTypeAppreciation() {
		return typeAppreciation;
	}

	public void setTypeAppreciation(TypeAppreciation typeAppreciation) {
		this.typeAppreciation = typeAppreciation;
	}

	public List<DBFile> getFiles() {
		return files;
	}

	public void setFiles(List<DBFile> files) {
		this.files = files;
	}

	public ProjetProgrammeIdee getProjetProgrammeIdee() {
		return projetProgrammeIdee;
	}

	public void setProjetProgrammeIdee(ProjetProgrammeIdee projetProgrammeIdee) {
		this.projetProgrammeIdee = projetProgrammeIdee;
	}

	public List<RessourceExterieure> getRessourceExterieures() {
		return ressourceExterieures;
	}

	public void setRessourceExterieures(List<RessourceExterieure> ressourceExterieures) {
		this.ressourceExterieures = ressourceExterieures;
	}

	public List<InstructionRequete> getInstructionRequetes() {
		return instructionRequetes;
	}

	public void setInstructionRequetes(List<InstructionRequete> instructionRequetes) {
		this.instructionRequetes = instructionRequetes;
	}

}
