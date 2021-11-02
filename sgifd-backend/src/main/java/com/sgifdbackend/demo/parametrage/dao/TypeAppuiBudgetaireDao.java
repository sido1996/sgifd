package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.TypeAppuiBudgetaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeAppuiBudgetaireDao extends JpaRepository<TypeAppuiBudgetaire, Long> {
    List<TypeAppuiBudgetaire> findByStatus(Boolean status);
}
