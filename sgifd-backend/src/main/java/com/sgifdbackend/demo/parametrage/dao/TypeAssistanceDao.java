package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.TypeAssistance;
import com.sgifdbackend.demo.parametrage.entites.TypeStructure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeAssistanceDao extends JpaRepository<TypeAssistance, Long> {
    List<TypeAssistance> findByStatus(Boolean status);
    List<TypeAssistance> findByStatusAndIsAppui(Boolean status, Boolean appui);
}
