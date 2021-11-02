package com.sgifdbackend.demo.entitiesBase;

public class EnumNatureAssistance {
	static Long APPUI_BUDGETAIRE = (long) 5;
	static Long AIDE_ALIMENTAIRE = (long) 6;
	static Long AIDE_SECOURS = (long)  8;
	
	public Long id_APPUI_BUDGETAIRE() {
		return APPUI_BUDGETAIRE;
	}
			
	public Long id_AIDE_ALIMENTAIRE() {
		return AIDE_ALIMENTAIRE;
	}
	
	public Long id_AIDE_SECOURS() {
		return AIDE_SECOURS;
	}
	
}
