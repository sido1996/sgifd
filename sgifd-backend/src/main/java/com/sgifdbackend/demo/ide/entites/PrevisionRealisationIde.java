package com.sgifdbackend.demo.ide.entites;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.Pays;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "t_previsionRealisationIde")
public class PrevisionRealisationIde extends EntityBaseBean implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    private  Double montantTheorique;

    @ManyToOne
    private Annee annee;
    
    private  Double montantRealisation;

    @ManyToOne
    private Ide ide;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getMontantTheorique() {
		return montantTheorique;
	}

	public void setMontantTheorique(Double montantTheorique) {
		this.montantTheorique = montantTheorique;
	}

	public Annee getAnnee() {
		return annee;
	}

	public void setAnnee(Annee annee) {
		this.annee = annee;
	}

	public Double getMontantRealisation() {
		return montantRealisation;
	}

	public void setMontantRealisation(Double montantRealisation) {
		this.montantRealisation = montantRealisation;
	}

	@JsonIgnore
	public Ide getIde() {
		return ide;
	}

	public void setIde(Ide ide) {
		this.ide = ide;
	}
	
}
