package com.sgifdbackend.demo.parametrage.entites;



import com.sgifdbackend.demo.accord.entites.Accord;
import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_StructureBeneficiaire")
public class StructureBeneficiaire extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String denominationStructure;

    private String sigleStructure;

    private String telStructure;

    private String emailStructure;

    private String adresseStructure;

    @ManyToMany(fetch = FetchType.LAZY,
      cascade = { CascadeType.MERGE })
    private List<DomaineActivite> domaineActivites;

    @ManyToOne
    private TypeStructure typestructure;

    @OneToMany(mappedBy = "structureBeneficiaire")
    private List<Accord> accords = new ArrayList<>();

    public StructureBeneficiaire() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDenominationStructure() {
		return denominationStructure;
	}

	public void setDenominationStructure(String denominationStructure) {
		this.denominationStructure = denominationStructure;
	}

	public String getSigleStructure() {
		return sigleStructure;
	}

	public void setSigleStructure(String sigleStructure) {
		this.sigleStructure = sigleStructure;
	}

	public String getTelStructure() {
		return telStructure;
	}

	public void setTelStructure(String telStructure) {
		this.telStructure = telStructure;
	}

	public String getEmailStructure() {
		return emailStructure;
	}

	public void setEmailStructure(String emailStructure) {
		this.emailStructure = emailStructure;
	}

	public String getAdresseStructure() {
		return adresseStructure;
	}

	public void setAdresseStructure(String adresseStructure) {
		this.adresseStructure = adresseStructure;
	}

	public List<DomaineActivite> getDomaineActivites() {
		return domaineActivites;
	}

	public void setDomaineActivites(List<DomaineActivite> domaineActivites) {
		this.domaineActivites = domaineActivites;
	}

	public TypeStructure getTypestructure() {
		return typestructure;
	}

	public void setTypestructure(TypeStructure typestructure) {
		this.typestructure = typestructure;
	}

}
