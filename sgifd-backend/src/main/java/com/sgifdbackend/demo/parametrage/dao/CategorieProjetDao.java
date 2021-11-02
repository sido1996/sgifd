package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.CategorieProjet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CategorieProjetDao extends JpaRepository<CategorieProjet, Long> {

    List<CategorieProjet> findByStatus(Boolean status);
}
