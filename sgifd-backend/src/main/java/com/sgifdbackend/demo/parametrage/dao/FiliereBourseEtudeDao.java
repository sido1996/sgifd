package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.FiliereBourseEtude;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FiliereBourseEtudeDao extends JpaRepository<FiliereBourseEtude, Long> {
    List<FiliereBourseEtude> findByStatus(Boolean status);
}
