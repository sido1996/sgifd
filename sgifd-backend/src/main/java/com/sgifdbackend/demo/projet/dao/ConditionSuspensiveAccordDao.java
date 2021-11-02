package com.sgifdbackend.demo.projet.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.sgifdbackend.demo.parametrage.entites.ProjetProgrammeIdee;
import com.sgifdbackend.demo.projet.entities.ConditionSuspensiveAccord;

import java.util.List;

@Repository
public interface ConditionSuspensiveAccordDao extends JpaRepository<ConditionSuspensiveAccord, Long> {
    public ConditionSuspensiveAccord findByIdIs(Long id);
    public ConditionSuspensiveAccord findConditionSuspensiveAccordById(Long id);

    List<ConditionSuspensiveAccord> findByStatus(Boolean status);
    List<ConditionSuspensiveAccord> findByStatusAndProjetProgrammeIdee(Boolean status, ProjetProgrammeIdee projet);
}
