package com.sgifdbackend.demo.payload;

import com.sgifdbackend.demo.parametrage.entites.StructureBeneficiaire;
import com.sgifdbackend.demo.security.entities.AccreditatedUser;
import com.sgifdbackend.demo.security.entities.ModuleUser;
import com.sgifdbackend.demo.security.entities.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


public class UpdateAccountRequest {
	
    private Long id;

    private String username;

    private String firstName;

    private String lastName;

    private String tel;

    private String email;

    private String password;
    
    private String profession;

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	@Override
	public String toString() {
		return "UpdateAccountRequest [id=" + id + ", username=" + username + ", firstName=" + firstName + ", lastName="
				+ lastName + ", tel=" + tel + ", email=" + email + ", password=" + password + ", profession="
				+ profession + ", accountStatus=" + accountStatus + "]";
	}
	
	

}
