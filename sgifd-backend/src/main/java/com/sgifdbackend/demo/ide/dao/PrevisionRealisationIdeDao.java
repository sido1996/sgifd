package com.sgifdbackend.demo.ide.dao;


import com.sgifdbackend.demo.ide.entites.Ide;
import com.sgifdbackend.demo.ide.entites.PrevisionRealisationIde;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrevisionRealisationIdeDao extends JpaRepository<PrevisionRealisationIde,Long> {
    public PrevisionRealisationIde findIdeById(Long id);
    public PrevisionRealisationIde findByIdIs(Long id);
    List<PrevisionRealisationIde> findByStatus(Boolean status);
    List<PrevisionRealisationIde> findByStatusAndIde(Boolean status, Ide ide);
}
