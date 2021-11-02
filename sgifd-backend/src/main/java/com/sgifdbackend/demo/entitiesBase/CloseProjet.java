package com.sgifdbackend.demo.entitiesBase;

import java.util.Date;

public class CloseProjet {
	
    private Long id;

    private Date dateClose;
    
    private String reasonClose;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDateClose() {
		return dateClose;
	}

	public void setDateClose(Date dateClose) {
		this.dateClose = dateClose;
	}

	public String getReasonClose() {
		return reasonClose;
	}

	public void setReasonClose(String reasonClose) {
		this.reasonClose = reasonClose;
	}

	
}
