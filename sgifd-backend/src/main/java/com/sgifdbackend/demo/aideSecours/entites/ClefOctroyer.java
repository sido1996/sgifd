package com.sgifdbackend.demo.aideSecours.entites;

import java.io.Serializable;

import javax.persistence.Embeddable;


@Embeddable
public class ClefOctroyer implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long idBourseFormation;
	
	private Long idCycleBourseEtude;
	
	private Long idFiliereBourseEtude;

	public Long getIdBourseFormation() {
		return idBourseFormation;
	}

	public void setIdBourseFormation(Long idBourseFormation) {
		this.idBourseFormation = idBourseFormation;
	}

	public Long getIdCycleBourseEtude() {
		return idCycleBourseEtude;
	}

	public void setIdCycleBourseEtude(Long idCycleBourseEtude) {
		this.idCycleBourseEtude = idCycleBourseEtude;
	}

	public Long getIdFiliereBourseEtude() {
		return idFiliereBourseEtude;
	}

	public void setIdFiliereBourseEtude(Long idFiliereBourseEtude) {
		this.idFiliereBourseEtude = idFiliereBourseEtude;
	}
	
		
	
}
