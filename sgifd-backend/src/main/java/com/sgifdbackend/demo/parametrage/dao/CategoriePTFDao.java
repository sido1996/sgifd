package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.Arrondissement;
import com.sgifdbackend.demo.parametrage.entites.CategoriePTF;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CategoriePTFDao extends JpaRepository<CategoriePTF, Long> {

    List<CategoriePTF> findByStatus(Boolean status);
}
