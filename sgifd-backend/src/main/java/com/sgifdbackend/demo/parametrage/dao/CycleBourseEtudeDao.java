package com.sgifdbackend.demo.parametrage.dao;


import com.sgifdbackend.demo.parametrage.entites.CycleBourseEtude;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CycleBourseEtudeDao extends JpaRepository<CycleBourseEtude, Long> {
    public CycleBourseEtude findByIdIs(Long id);
    List<CycleBourseEtude> findByStatus(Boolean status);
}
