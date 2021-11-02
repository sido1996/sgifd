package com.sgifdbackend.demo.security.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgifdbackend.demo.security.entities.FonctionnaliteUser;

import java.util.List;
import java.util.Optional;

@Repository
public interface FonctionnaliteUserRepository extends JpaRepository<FonctionnaliteUser, Long> {

	Optional<FonctionnaliteUser> findById(Long id);
    
    List<FonctionnaliteUser> findByStatus(boolean status);

}
