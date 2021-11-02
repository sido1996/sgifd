package com.sgifdbackend.demo.aideSecours.entites;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.sgifdbackend.demo.parametrage.entites.Annee;
import com.sgifdbackend.demo.parametrage.entites.Informateur;
import com.sgifdbackend.demo.parametrage.entites.NatureAssistance;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.Pays;

@Entity
@DiscriminatorValue(value="BOUR")
public class BourseFormation extends AideSecours implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@OneToMany
	private List<Octroyer> octroyers = new ArrayList<>();
	
	public BourseFormation() {
		// TODO Auto-generated constructor stub
	}
	public BourseFormation(Long id, Double montant, String observation, Annee annee, PTFBailleurFrs ptfBailleurFrs,
			NatureAssistance natureAssistance, Informateur informateur) {
		super(id, montant, observation, annee, ptfBailleurFrs, natureAssistance, informateur);
		// TODO Auto-generated constructor stub
	}
	
	public List<Octroyer> getOctroyers() {
		return octroyers;
	}
	public void setOctroyers(List<Octroyer> octroyers) {
		this.octroyers = octroyers;
	}
	

}
