package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.Pays;
import com.sgifdbackend.demo.parametrage.entites.PilierPAG;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PilierPAGDao extends JpaRepository<PilierPAG, Long> {

    Pays findById(String id);
    Pays findByIdLike(String id);
    List<PilierPAG> findByStatus(Boolean status);
}
