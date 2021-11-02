package com.sgifdbackend.demo.security.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgifdbackend.demo.security.entities.ModuleUser;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModuleUserRepository extends JpaRepository<ModuleUser, Long> {

    Optional<ModuleUser> findById(Long id);
    
    List<ModuleUser> findByStatus(boolean status);

}
