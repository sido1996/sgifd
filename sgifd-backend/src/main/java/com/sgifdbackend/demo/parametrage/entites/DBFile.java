package com.sgifdbackend.demo.parametrage.entites;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;

import com.sgifdbackend.demo.accord.entites.Accord;
import com.sgifdbackend.demo.aideSecours.entites.AideSecours;
import com.sgifdbackend.demo.appuibudgetaire.entities.AppuiBudgetaire;
/*import com.sgifdbackend.demo.appuibudgetaire.entities.AppuiBudgetaire;*/
import com.sgifdbackend.demo.commission_mixte_dsp.entities.CommissionMixteDSP;
import com.sgifdbackend.demo.cooperationdecentralisee.entities.CooperationDecentralisee;
import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.fondspecifique.entities.FondSpecifique;
import com.sgifdbackend.demo.ide.entites.Ide;
import com.sgifdbackend.demo.ppp.entites.ContratPPP;
import com.sgifdbackend.demo.requetefinancement.entities.RequeteFinancement;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "t_Pieces")
public class DBFile extends EntityBaseBean implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	//@GeneratedValue(strategy = GenerationType.AUTO)
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;

	private String fileName;

	private String fullFileName;

	private String fileType;

	private String namePiece;
	
	private String refPiece;

	private String refEmplacement;

	private String resumePiece;

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private RequeteFinancement requeteFinancement;

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private FondSpecifique fondSpecifique;

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private CommissionMixteDSP commissionMixteDSP;

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private ContratPPP contratPPP;

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private Ide ide;

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private CooperationDecentralisee cooperationDecentralisee;

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private Accord accord;

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private AideSecours aideSecours;

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE})
    private ProjetProgrammeIdee projetProgrammeIdee;
    
	
	  @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE}) private
	  AppuiBudgetaire appuibudgetaire;
	  
	  
	  @JsonIgnore public AppuiBudgetaire getAppuibudgetaire() { return
	  appuibudgetaire; }
	  
	  public void setAppuibudgetaire(AppuiBudgetaire appuibudgetaire) {
	  this.appuibudgetaire = appuibudgetaire; }
	 

	public String getNamePiece() {
		return namePiece;
	}

	public void setNamePiece(String namePiece) {
		this.namePiece = namePiece;
	}

	public String getRefPiece() {
		return refPiece;
	}

	public void setRefPiece(String refPiece) {
		this.refPiece = refPiece;
	}

	public String getRefEmplacement() {
		return refEmplacement;
	}

	public void setRefEmplacement(String refEmplacement) {
		this.refEmplacement = refEmplacement;
	}

	public String getResumePiece() {
		return resumePiece;
	}

	public void setResumePiece(String resumePiece) {
		this.resumePiece = resumePiece;
	}

	@JsonIgnore
	public CommissionMixteDSP getCommissionMixteDSP() {
		return commissionMixteDSP;
	}

	public void setCommissionMixteDSP(CommissionMixteDSP commissionMixteDSP) {
		this.commissionMixteDSP = commissionMixteDSP;
	}

	public void setFullFileName(String fullFileName) {
		this.fullFileName = fullFileName;
	}

	public DBFile() {

	}

	public DBFile(String fileName, String fileType) {
		this.fileName = fileName;
		this.fileType = fileType;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getFullFileName() {
		return fullFileName;
	}

	public void setFullFileName() {
		this.fullFileName = getId()+'_'+getFileName();
	}

	@JsonIgnore
	public RequeteFinancement getRequeteFinancement() {
		return requeteFinancement;
	}

	public void setRequeteFinancement(RequeteFinancement requeteFinancement) {
		this.requeteFinancement = requeteFinancement;
	}

	@JsonIgnore
	public FondSpecifique getFondSpecifique() {
		return fondSpecifique;
	}

	public void setFondSpecifique(FondSpecifique fondSpecifique) {
		this.fondSpecifique = fondSpecifique;
	}

	@JsonIgnore
	public ContratPPP getContratPPP() {
		return contratPPP;
	}

	public void setContratPPP(ContratPPP contratPPP) {
		this.contratPPP = contratPPP;
	}

	@JsonIgnore
	public Ide getIde() {
		return ide;
	}

	public void setIde(Ide ide) {
		this.ide = ide;
	}

	@JsonIgnore
	public CooperationDecentralisee getCooperationDecentralisee() {
		return cooperationDecentralisee;
	}

	public void setCooperationDecentralisee(CooperationDecentralisee cooperationDecentralisee) {
		this.cooperationDecentralisee = cooperationDecentralisee;
	}

	@JsonIgnore
	public Accord getAccord() {
		return accord;
	}

	public void setAccord(Accord accord) {
		this.accord = accord;
	}

	@JsonIgnore
	public AideSecours getAideSecours() {
		return aideSecours;
	}

	public void setAideSecours(AideSecours aideSecours) {
		this.aideSecours = aideSecours;
	}

	@JsonIgnore
	public ProjetProgrammeIdee getProjetProgrammeIdee() {
		return projetProgrammeIdee;
	}

	public void setProjetProgrammeIdee(ProjetProgrammeIdee projetProgrammeIdee) {
		this.projetProgrammeIdee = projetProgrammeIdee;
	}
	
	
}
