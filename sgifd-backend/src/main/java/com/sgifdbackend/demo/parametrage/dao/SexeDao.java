package com.sgifdbackend.demo.parametrage.dao;



import com.sgifdbackend.demo.parametrage.entites.Secteur;
import com.sgifdbackend.demo.parametrage.entites.Sexe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SexeDao extends JpaRepository<Sexe, Long> {

    List<Sexe> findByStatus(Boolean status);
}
