package com.sgifdbackend.demo.projet.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.entities.ConditionSuspensiveDecaissement;

import java.util.List;

@Repository
public interface ConditionSuspensiveDecaissementDao extends JpaRepository<ConditionSuspensiveDecaissement, Long> {
    public ConditionSuspensiveDecaissement findByIdIs(Long id);
    public ConditionSuspensiveDecaissement findConditionSuspensiveAccordById(Long id);

    List<ConditionSuspensiveDecaissement> findByStatus(Boolean status);
    List<ConditionSuspensiveDecaissement> findByStatusAndProjetProgrammeIdee(Boolean status, ProjetProgrammeIdee projet);
}
