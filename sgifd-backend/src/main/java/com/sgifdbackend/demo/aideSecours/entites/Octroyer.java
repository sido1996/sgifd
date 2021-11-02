package com.sgifdbackend.demo.aideSecours.entites;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.Commune;
import com.sgifdbackend.demo.parametrage.entites.CycleBourseEtude;
import com.sgifdbackend.demo.parametrage.entites.Departement;
import com.sgifdbackend.demo.parametrage.entites.FiliereBourseEtude;
import com.sgifdbackend.demo.parametrage.entites.Sexe;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="t_octroyer")
public class Octroyer extends EntityBaseBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	/*@EmbeddedId
	private ClefOctroyer pkOctroyer;
		*/
	private int nombre;
	
	@ManyToOne
   	private FiliereBourseEtude filiereBourseEtude;
	
    @ManyToOne
   	private CycleBourseEtude cycleBourseEtude;
    
    @ManyToOne
   	private Sexe sexe;
    
    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE})
   	private BourseFormation bourseFormation;    
    
    @ManyToOne
   	private Commune commune;
    
    @ManyToOne
   	private Departement departement;

	public int getNombre() {
		return nombre;
	}

	public void setNombre(int nombre) {
		this.nombre = nombre;
	}

	public FiliereBourseEtude getFiliereBourseEtude() {
		return filiereBourseEtude;
	}

	public void setFiliereBourseEtude(FiliereBourseEtude filiereBourseEtude) {
		this.filiereBourseEtude = filiereBourseEtude;
	}

	public CycleBourseEtude getCycleBourseEtude() {
		return cycleBourseEtude;
	}

	public void setCycleBourseEtude(CycleBourseEtude cycleBourseEtude) {
		this.cycleBourseEtude = cycleBourseEtude;
	}

	public Sexe getSexe() {
		return sexe;
	}

	public void setSexe(Sexe sexe) {
		this.sexe = sexe;
	}

	public Commune getCommune() {
		return commune;
	}

	public void setCommune(Commune commune) {
		this.commune = commune;
	}

	public Departement getDepartement() {
		return departement;
	}

	public void setDepartement(Departement departement) {
		this.departement = departement;
	}
	
	@JsonIgnore
	public BourseFormation getBourseFormation() {
		return bourseFormation;
	}

	public void setBourseFormation(BourseFormation bourseFormation) {
		this.bourseFormation = bourseFormation;
	}
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	private Octroyer() {
		// TODO Auto-generated constructor stub
	}  
    
    
	

}
