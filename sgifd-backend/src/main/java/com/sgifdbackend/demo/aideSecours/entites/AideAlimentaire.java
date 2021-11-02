package com.sgifdbackend.demo.aideSecours.entites;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.Informateur;
import com.sgifdbackend.demo.parametrage.entites.NatureAssistance;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.Pays;

@Entity
@DiscriminatorValue(value="ALIM")
public class AideAlimentaire extends AideSecours implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@OneToMany(mappedBy="aideAlimentaire")
	private List<NatureAideAlimentaireDetail> natureAideAlimentaireDetails = new ArrayList<>();

	public AideAlimentaire() {
		// TODO Auto-generated constructor stub
	}

	public AideAlimentaire(Long id, Double montant, String observation, Annee annee, PTFBailleurFrs ptfBailleurFrs,
			NatureAssistance natureAssistance, Informateur informateur) {
		super(id, montant, observation, annee, ptfBailleurFrs, natureAssistance, informateur);
		// TODO Auto-generated constructor stub
	}

	public List<NatureAideAlimentaireDetail> getNatureAideAlimentaireDetails() {
		return natureAideAlimentaireDetails;
	}

	public void setNatureAideAlimentaireDetails(List<NatureAideAlimentaireDetail> natureAideAlimentaireDetails) {
		this.natureAideAlimentaireDetails = natureAideAlimentaireDetails;
	}
}
