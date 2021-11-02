package com.sgifdbackend.demo.entitiesBase;


import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;


@MappedSuperclass
public abstract class Personne extends EntityBaseBean implements Serializable {

    private static final long serialVersionUID = 1L;

    private String nom;
    private String prenoms;
    private Boolean actif;

    @Column(unique=true)
    private String username;
    private String password;

    @Column(unique=true, length = 32, nullable = false)
    private String email;
    @Column(unique=true)
    private long tel;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenoms() {
        return prenoms;
    }

    public void setPrenoms(String prenoms) {
        this.prenoms = prenoms;
    }

    public Boolean getActif() {
        return actif;
    }

    public void setActif(Boolean actif) {
        this.actif = actif;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getTel() {
        return tel;
    }

    public void setTel(long tel) {
        this.tel = tel;
    }

    public Personne() {
    }


    public Personne(String nom, String prenoms, String username, String password, String email, long tel) {
        this.nom = nom;
        this.prenoms = prenoms;
        this.username = username;
        this.password = password;
        this.email = email;
        this.tel = tel;
    }

    @Override
    public String toString() {
        return "Personne{" +
                "nom='" + nom + '\'' +
                ", prenoms='" + prenoms + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", tel=" + tel +
                '}';
    }
}
