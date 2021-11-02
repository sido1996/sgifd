package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.Arrondissement;
import com.sgifdbackend.demo.parametrage.entites.TypeStructure;
import com.sgifdbackend.demo.parametrage.entites.ZoneLocalite;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZoneLocaliteDao extends JpaRepository<ZoneLocalite, Long> {
    List<ZoneLocalite> findByStatus(Boolean status);
    
    List<ZoneLocalite> findByArrondissement_id(Long id);
}
