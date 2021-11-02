package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.TypeAssistance;
import com.sgifdbackend.demo.parametrage.entites.TypeFondSpecifique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeFondSpecifiqueDao extends JpaRepository<TypeFondSpecifique, Long> {
    List<TypeFondSpecifique> findByStatus(Boolean status);
}
