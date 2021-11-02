package com.sgifdbackend.demo.payload;

import com.sgifdbackend.demo.parametrage.entites.StructureBeneficiaire;
import com.sgifdbackend.demo.security.entities.AccreditatedUser;
import com.sgifdbackend.demo.security.entities.ModuleUser;
import com.sgifdbackend.demo.security.entities.Role;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


public class UserUpdateRequest {
	
    private Long id;
    
    private String username;

    private String firstName;

    private String lastName;

    private String tel;

    private String email;
    
    private String profession;


    private Set<Role> roles = new HashSet<>();

    private List<AccreditatedUser> accreditatedUsers = new ArrayList<>();

    private List<ModuleUser> moduleUsers  = new ArrayList<>();
    
    private StructureBeneficiaire structureBeneficiaire;
    
    private Boolean accountStatus = false;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
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

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public List<AccreditatedUser> getAccreditatedUsers() {
		return accreditatedUsers;
	}

	public void setAccreditatedUsers(List<AccreditatedUser> accreditatedUsers) {
		this.accreditatedUsers = accreditatedUsers;
	}

	public List<ModuleUser> getModuleUsers() {
		return moduleUsers;
	}

	public void setModuleUsers(List<ModuleUser> moduleUsers) {
		this.moduleUsers = moduleUsers;
	}

	public StructureBeneficiaire getStructureBeneficiaire() {
		return structureBeneficiaire;
	}

	public void setStructureBeneficiaire(StructureBeneficiaire structureBeneficiaire) {
		this.structureBeneficiaire = structureBeneficiaire;
	}

	public Boolean getAccountStatus() {
		return accountStatus;
	}

	public void setAccountStatus(Boolean accountStatus) {
		this.accountStatus = accountStatus;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}
	
    
}
