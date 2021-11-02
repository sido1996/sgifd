package com.sgifdbackend.demo.commission_mixte_dsp.dao;

import com.sgifdbackend.demo.commission_mixte_dsp.entities.AxePrioritaireCommission;
import com.sgifdbackend.demo.commission_mixte_dsp.entities.CommissionMixteDSP;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AxePrioritaireCommissionDao extends JpaRepository<AxePrioritaireCommission,Long> {
    public AxePrioritaireCommission findIdeById(Long id);
    public AxePrioritaireCommission findByIdIs(Long id);
    List<AxePrioritaireCommission> findByStatus(Boolean status);
    List<AxePrioritaireCommission> findByStatusAndCommissionMixteDSP(Boolean status, CommissionMixteDSP commissionMixteDSP);
    public AxePrioritaireCommission findByStatusIsFalseAndId(long id);
}
