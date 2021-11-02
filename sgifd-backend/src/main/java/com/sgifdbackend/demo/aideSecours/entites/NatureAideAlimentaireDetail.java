package com.sgifdbackend.demo.aideSecours.entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.parametrage.entites.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="t_nature_aide_alimentaire_detail")
public class NatureAideAlimentaireDetail extends EntityBaseBean implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(columnDefinition = "float default 0.0")
	private float quantite;

	@Column(columnDefinition = "float default 0.0")
	private float montant;

	@Column(columnDefinition = "float default 0.0")
	private float montantDevise;

	private String caracteristique;

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE})
   	private AideAlimentaire aideAlimentaire;

	@ManyToOne
   	private NatureAideAlimentaire natureAideAlimentaire;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	private NatureAideAlimentaireDetail() {
		// TODO Auto-generated constructor stub
	}

	public float getQuantite() {
		return quantite;
	}

	public void setQuantite(float quantite) {
		this.quantite = quantite;
	}

	public String getCaracteristique() {
		return caracteristique;
	}

	public void setCaracteristique(String caracteristique) {
		this.caracteristique = caracteristique;
	}

	@JsonIgnore
	public AideAlimentaire getAideAlimentaire() {
		return aideAlimentaire;
	}

	public void setAideAlimentaire(AideAlimentaire aideAlimentaire) {
		this.aideAlimentaire = aideAlimentaire;
	}

	public NatureAideAlimentaire getNatureAideAlimentaire() {
		return natureAideAlimentaire;
	}

	public void setNatureAideAlimentaire(NatureAideAlimentaire natureAideAlimentaire) {
		this.natureAideAlimentaire = natureAideAlimentaire;
	}

	public float getMontant() {
		return montant;
	}

	public void setMontant(float montant) {
		this.montant = montant;
	}

	public float getMontantDevise() {
		return montantDevise;
	}

	public void setMontantDevise(float montantDevise) {
		this.montantDevise = montantDevise;
	}
}
