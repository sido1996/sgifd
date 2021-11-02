package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.NatureAssistance;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository

public interface NatureAssistanceDao extends JpaRepository<NatureAssistance, Long> {
//    public Agent findById(Long id);
    List<NatureAssistance> findByStatus(Boolean status);
    List<NatureAssistance> findByStatusAndIsAppui(Boolean status, Boolean appui);

}
