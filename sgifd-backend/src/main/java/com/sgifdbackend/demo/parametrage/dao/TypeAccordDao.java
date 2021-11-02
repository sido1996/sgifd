package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.TypeAccord;
import com.sgifdbackend.demo.parametrage.entites.TypeStructure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeAccordDao extends JpaRepository<TypeAccord, Long> {
    List<TypeAccord> findByStatus(Boolean status);
}
