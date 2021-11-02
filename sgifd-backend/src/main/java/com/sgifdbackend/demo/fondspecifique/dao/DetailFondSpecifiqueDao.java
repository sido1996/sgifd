package com.sgifdbackend.demo.fondspecifique.dao;


import com.sgifdbackend.demo.fondspecifique.entities.DetailFondSpecifique;
import com.sgifdbackend.demo.fondspecifique.entities.FondSpecifique;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailFondSpecifiqueDao extends JpaRepository<DetailFondSpecifique,Long> {
    public DetailFondSpecifique findIdeById(Long id);
    public DetailFondSpecifique findByIdIs(Long id);
    List<DetailFondSpecifique> findByStatus(Boolean status);
    List<DetailFondSpecifique> findByStatusAndFondSpecifique(Boolean status, FondSpecifique fondSpecifique);
    public DetailFondSpecifique findByStatusIsFalseAndId(long id);
}
