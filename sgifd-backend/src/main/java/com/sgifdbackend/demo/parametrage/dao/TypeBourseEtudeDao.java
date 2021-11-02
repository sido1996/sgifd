package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.TypeBourseEtude;
import com.sgifdbackend.demo.parametrage.entites.TypeStructure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeBourseEtudeDao extends JpaRepository<TypeBourseEtude, Long> {
    List<TypeBourseEtude> findByStatus(Boolean status);
}
