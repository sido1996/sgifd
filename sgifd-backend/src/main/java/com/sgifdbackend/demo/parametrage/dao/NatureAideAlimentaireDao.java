package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.NatureAideAlimentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NatureAideAlimentaireDao extends JpaRepository<NatureAideAlimentaire, Long> {
    List<NatureAideAlimentaire> findByStatus(Boolean status);
}
