package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.Envergure;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository

public interface EnvergureDao extends JpaRepository<Envergure, Long> {
//    public Agent findById(Long id);


    List<Envergure> findByStatus(Boolean status);
}
