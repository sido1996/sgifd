package com.sgifdbackend.demo.payload;

import java.util.Date;

public class ProjetDoublonRequest {

	private Long id;
	private String reference;
	private String libelle;
	private Double coutGlobalProjet;
	private Date dateDemarrage;

	public ProjetDoublonRequest(Long id, String reference, String libelle, Double coutGlobalProjet, Date dateDemarrage) {
		this.id = id;
		this.reference = reference;
		this.libelle = libelle;
		this.coutGlobalProjet = coutGlobalProjet;
		this.dateDemarrage = dateDemarrage;
	}


}
