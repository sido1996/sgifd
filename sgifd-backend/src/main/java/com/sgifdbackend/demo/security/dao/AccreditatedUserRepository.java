package com.sgifdbackend.demo.security.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgifdbackend.demo.security.entities.AccreditatedUser;
import com.sgifdbackend.demo.security.entities.ModuleUser;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccreditatedUserRepository extends JpaRepository<AccreditatedUser, Long> {

	Optional<AccreditatedUser> findById(Long id);
    
    List<AccreditatedUser> findByStatus(boolean status);

}
