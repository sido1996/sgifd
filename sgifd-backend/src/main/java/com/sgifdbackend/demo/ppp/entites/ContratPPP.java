package com.sgifdbackend.demo.ppp.entites;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.ide.entites.PrevisionRealisationIde;
import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.sgifdbackend.demo.parametrage.entites.DomainePTF;
import com.sgifdbackend.demo.parametrage.entites.Envergure;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.PilierPAG;
import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.parametrage.entites.Promoteur;
import com.sgifdbackend.demo.parametrage.entites.Secteur;
import com.sgifdbackend.demo.parametrage.entites.TypeCooperation;
import com.sgifdbackend.demo.parametrage.entites.ZoneLocalite;
@Entity
@Table(name="t_ContratPPP")
public class ContratPPP extends EntityBaseBean implements Serializable {
	 /**
		 * 
		 */
		private static final long serialVersionUID = 1L;

		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
		
		private String categorie;
		
		private String libelle;  

	    private String observations;

	    @ManyToOne
	    private Annee anneePartenariat;

	    @ManyToOne
	    private ProjetProgrammeIdee projetProgrammeIdee;
	    
	    @ManyToOne
	    private TypeCooperation typeCooperation;

	    @ManyToOne
	    private DeviseMonnaie deviseMonnaie;
	    
	    private  Double montantTheorique;
	    
	    private  Double montantDevise;
	    
	    @ManyToMany
	    private List<Promoteur> promoteurs  = new ArrayList<>();

	    @OneToMany(mappedBy = "contratPPP")
	    private List<PrevisionRealisationPPP> previsionRealisationPPPs = new ArrayList<>();

	    
	    @OneToMany(mappedBy = "contratPPP", cascade= {CascadeType.PERSIST, CascadeType.MERGE})
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

		

		public String getCategorie() {
			return categorie;
		}

		public void setCategorie(String categorie) {
			this.categorie = categorie;
		}

		public String getObservations() {
			return observations;
		}

		public void setObservations(String observations) {
			this.observations = observations;
		}

		public Annee getAnneePartenariat() {
			return anneePartenariat;
		}

		public void setAnneePartenariat(Annee anneePartenariat) {
			this.anneePartenariat = anneePartenariat;
		}

		public ProjetProgrammeIdee getProjetProgrammeIdee() {
			return projetProgrammeIdee;
		}

		public void setProjetProgrammeIdee(ProjetProgrammeIdee projetProgrammeIdee) {
			this.projetProgrammeIdee = projetProgrammeIdee;
		}

		public TypeCooperation getTypeCooperation() {
			return typeCooperation;
		}

		public void setTypeCooperation(TypeCooperation typeCooperation) {
			this.typeCooperation = typeCooperation;
		}

		public Double getMontantTheorique() {
			return montantTheorique;
		}

		public void setMontantTheorique(Double montantTheorique) {
			this.montantTheorique = montantTheorique;
		}

		public List<Promoteur> getPromoteurs() {
			return promoteurs;
		}

		public void setPromoteurs(List<Promoteur> promoteurs) {
			this.promoteurs = promoteurs;
		}

		public List<PrevisionRealisationPPP> getPrevisionRealisationPPPs() {
			return previsionRealisationPPPs;
		}

		public void setPrevisionRealisationPPPs(List<PrevisionRealisationPPP> previsionRealisationPPPs) {
			this.previsionRealisationPPPs = previsionRealisationPPPs;
		}

		public List<DBFile> getFiles() {
			return files;
		}

		public void setFiles(List<DBFile> files) {
			this.files = files;
		}

		public DeviseMonnaie getDeviseMonnaie() {
			return deviseMonnaie;
		}

		public void setDeviseMonnaie(DeviseMonnaie deviseMonnaie) {
			this.deviseMonnaie = deviseMonnaie;
		}

		public Double getMontantDevise() {
			return montantDevise;
		}

		public void setMontantDevise(Double montantDevise) {
			this.montantDevise = montantDevise;
		}
		 
		
}
