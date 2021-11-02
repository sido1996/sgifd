package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.TypeAppreciation;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository

public interface TypeAppreciationDao extends JpaRepository<TypeAppreciation, Long> {
//    public Agent findById(Long id);


    List<TypeAppreciation> findByStatus(Boolean status);
}
