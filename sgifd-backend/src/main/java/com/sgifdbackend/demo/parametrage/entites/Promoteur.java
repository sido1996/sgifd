package com.sgifdbackend.demo.parametrage.entites;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;

import javax.persistence.*;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "t_promoteur")
public class Promoteur extends EntityBaseBean implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	private String nomcomplet;
	private String tel;

	private String email;
	private String type;
	private String adresse;     
	private String anneeCreation;  


	/*@OneToMany(mappedBy = "promoteur")
    private List<Ide> Ide = new ArrayList<>();
*/
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getNomcomplet() {
		return nomcomplet;
	}

	public void setNomcomplet(String nomcomplet) {
		this.nomcomplet = nomcomplet;
	}

	public Promoteur() {
    }

	public Promoteur(String nomcomplet) {
		super();
		this.nomcomplet = nomcomplet;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getAnneeCreation() {
		return anneeCreation;
	}

	public void setAnneeCreation(String anneeCreation) {
		this.anneeCreation = anneeCreation;
	}

    
}
