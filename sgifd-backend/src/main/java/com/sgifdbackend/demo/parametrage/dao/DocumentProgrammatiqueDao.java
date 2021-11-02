package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.DocumentProgrammatique;
import com.sgifdbackend.demo.parametrage.entites.ODD;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentProgrammatiqueDao extends JpaRepository<DocumentProgrammatique, Long> {

    List<DocumentProgrammatique> findByStatus(Boolean status);
}
