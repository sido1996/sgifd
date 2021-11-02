package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.TypeBourseEtude;
import com.sgifdbackend.demo.parametrage.entites.TypeRessourceInterieure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeRessourceInterieureDao extends JpaRepository<TypeRessourceInterieure, Long> {
    List<TypeRessourceInterieure> findByStatus(Boolean status);
}
