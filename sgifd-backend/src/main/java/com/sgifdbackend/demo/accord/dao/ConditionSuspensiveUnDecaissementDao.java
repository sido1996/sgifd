package com.sgifdbackend.demo.accord.dao;

import com.sgifdbackend.demo.accord.entites.ConditionSuspensiveUnDecaissement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConditionSuspensiveUnDecaissementDao extends JpaRepository<ConditionSuspensiveUnDecaissement, Long> {
    //@Query("from ConditionSuspensiveUnDecaissement  Csd where Csd.id=id")
    ConditionSuspensiveUnDecaissement findByIdIs(Long id);
    ConditionSuspensiveUnDecaissement findConditionSuspensiveUnDecaissementById(Long id);
    List<ConditionSuspensiveUnDecaissement> findByStatus(Boolean status);
}
