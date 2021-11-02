package com.sgifdbackend.demo.parametrage.dao;


import com.sgifdbackend.demo.parametrage.entites.DomainePTF;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DomainePTFDao extends JpaRepository<DomainePTF, Long> {
    List<DomainePTF> findByStatus(Boolean status);
}
