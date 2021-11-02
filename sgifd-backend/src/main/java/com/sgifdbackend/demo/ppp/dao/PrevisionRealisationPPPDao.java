package com.sgifdbackend.demo.ppp.dao;


import com.sgifdbackend.demo.ide.entites.Ide;
import com.sgifdbackend.demo.ide.entites.PrevisionRealisationIde;
import com.sgifdbackend.demo.ppp.entites.ContratPPP;
import com.sgifdbackend.demo.ppp.entites.PrevisionRealisationPPP;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrevisionRealisationPPPDao extends JpaRepository<PrevisionRealisationPPP,Long> {
    public PrevisionRealisationPPP findIdeById(Long id);
    public PrevisionRealisationPPP findByIdIs(Long id);
    List<PrevisionRealisationPPP> findByStatus(Boolean status);
    List<PrevisionRealisationPPP> findByStatusAndContratPPP(Boolean status, ContratPPP contratPPP);
}
