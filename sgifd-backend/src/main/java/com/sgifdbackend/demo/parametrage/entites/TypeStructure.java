package com.sgifdbackend.demo.parametrage.entites;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "t_TypeStructure")
public class TypeStructure extends EntityBaseBean implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String libelle;

    @ManyToMany
    private List<TypeCooperation> typeCooperationList = new ArrayList<>();

    @ManyToMany
    private List<DocumentProgrammatique> documentProgrammatiqueList = new ArrayList<>();

    public TypeStructure() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public List<TypeCooperation> getTypeCooperationList() {
        return typeCooperationList;
    }

    public void setTypeCooperationList(List<TypeCooperation> typeCooperationList) {
        this.typeCooperationList = typeCooperationList;
    }

    public List<DocumentProgrammatique> getDocumentProgrammatiqueList() {
        return documentProgrammatiqueList;
    }

    public void setDocumentProgrammatiqueList(List<DocumentProgrammatique> documentProgrammatiqueList) {
        this.documentProgrammatiqueList = documentProgrammatiqueList;
    }
}
