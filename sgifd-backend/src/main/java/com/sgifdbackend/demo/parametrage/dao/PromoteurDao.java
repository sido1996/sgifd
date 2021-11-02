package com.sgifdbackend.demo.parametrage.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgifdbackend.demo.parametrage.entites.Promoteur;

import java.util.List;

@Repository
public interface PromoteurDao extends JpaRepository<Promoteur, Long> {
    public Promoteur findPromotionById(Long id);
    public Promoteur findByIdIs(Long id);

    List<Promoteur> findByStatus(Boolean status);
    
}
