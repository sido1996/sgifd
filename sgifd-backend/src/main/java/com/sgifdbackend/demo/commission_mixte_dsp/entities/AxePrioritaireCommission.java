package com.sgifdbackend.demo.commission_mixte_dsp.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.DeviseMonnaie;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "t_AxePrioritaireCommission")
public class AxePrioritaireCommission extends EntityBaseBean implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;
	
	private String libelle;
	@Column(name="montantDevise")
    private  Double montantPrevisionnelDevise;
    @Column(name="montantFcfa")
    private  Double montantPrevisionnelFcfa;

    @ManyToOne
    private DeviseMonnaie deviseMonnaie;

    @ManyToOne
    private CommissionMixteDSP commissionMixteDSP;

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

	public Double getMontantPrevisionnelDevise() {
		return montantPrevisionnelDevise;
	}

	public void setMontantPrevisionnelDevise(Double montantPrevisionnelDevise) {
		this.montantPrevisionnelDevise = montantPrevisionnelDevise;
	}

	public Double getMontantPrevisionnelFcfa() {
		return montantPrevisionnelFcfa;
	}

	public void setMontantPrevisionnelFcfa(Double montantPrevisionnelFcfa) {
		this.montantPrevisionnelFcfa = montantPrevisionnelFcfa;
	}

	public DeviseMonnaie getDeviseMonnaie() {
		return deviseMonnaie;
	}

	public void setDeviseMonnaie(DeviseMonnaie deviseMonnaie) {
		this.deviseMonnaie = deviseMonnaie;
	}

	@JsonIgnore
	public CommissionMixteDSP getCommissionMixteDSP() {
		return commissionMixteDSP;
	}

	public void setCommissionMixteDSP(CommissionMixteDSP commissionMixteDSP) {
		this.commissionMixteDSP = commissionMixteDSP;
	}
   
}
