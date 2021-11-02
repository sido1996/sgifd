package com.sgifdbackend.demo.fondspecifique.dao;


import com.sgifdbackend.demo.fondspecifique.entities.FondSpecifique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FondSpecifiqueDao extends JpaRepository<FondSpecifique,Long> {
    public FondSpecifique findIdeById(Long id);
    public FondSpecifique findByIdIs(Long id);
    List<FondSpecifique> findByStatus(Boolean status);
    public FondSpecifique findByStatusIsFalseAndId(long id);
}
