package com.sgifdbackend.demo.parametrage.entites;

import com.sgifdbackend.demo.accord.entites.Accord;
import com.sgifdbackend.demo.commission_mixte_dsp.entities.CommissionMixteDSP;
import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "t_PTFBailleurFrs")
public class PTFBailleurFrs extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String denominationptf;

    @Column(nullable = true)
    private String sigleptf;

    @Column(nullable = true)
    private String telptf;

    @Column(nullable = true)
    private String emailptf;

    @Column(nullable = true)
    private String adresseptf;

    @Column(nullable = true)
    private String adresseptfEtrangere;

    @ManyToOne
    private Pays pays;
    
    @ManyToOne
    private CategoriePTF categorieptf;

    @ManyToOne
    private RegroupementClub regroupementclub;

    @ManyToMany(fetch = FetchType.LAZY,
      cascade = { CascadeType.MERGE })
    private List<DomainePTF> domaineptfs;

    @OneToMany(mappedBy = "ptfBailleurFrs")
    private List<Accord> accords = new ArrayList<>();
    
   
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDenominationptf() {
		return denominationptf;
	}

	public void setDenominationptf(String denominationptf) {
		this.denominationptf = denominationptf;
	}

	public String getSigleptf() {
		return sigleptf;
	}

	public void setSigleptf(String sigleptf) {
		this.sigleptf = sigleptf;
	}

	public String getTelptf() {
		return telptf;
	}

	public void setTelptf(String telptf) {
		this.telptf = telptf;
	}

	public String getEmailptf() {
		return emailptf;
	}

	public void setEmailptf(String emailptf) {
		this.emailptf = emailptf;
	}

	public String getAdresseptf() {
		return adresseptf;
	}

	public void setAdresseptf(String adresseptf) {
		this.adresseptf = adresseptf;
	}

	public Pays getPays() {
		return pays;
	}

	public void setPays(Pays pays) {
		this.pays = pays;
	}

	public CategoriePTF getCategorieptf() {
		return categorieptf;
	}

	public void setCategorieptf(CategoriePTF categorieptf) {
		this.categorieptf = categorieptf;
	}

	public RegroupementClub getRegroupementclub() {
		return regroupementclub;
	}

	public void setRegroupementclub(RegroupementClub regroupementclub) {
		this.regroupementclub = regroupementclub;
	}

	public List<DomainePTF> getDomaineptfs() {
		return domaineptfs;
	}

	public void setDomaineptfs(List<DomainePTF> domaineptfs) {
		this.domaineptfs = domaineptfs;
	}

	public String getAdresseptfEtrangere() {
		return adresseptfEtrangere;
	}

	public void setAdresseptfEtrangere(String adresseptfEtrangere) {
		this.adresseptfEtrangere = adresseptfEtrangere;
	}

}
