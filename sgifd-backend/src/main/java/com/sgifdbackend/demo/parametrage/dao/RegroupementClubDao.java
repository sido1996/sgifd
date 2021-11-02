package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.RegroupementClub;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegroupementClubDao extends JpaRepository<RegroupementClub, Long> {

    List<RegroupementClub> findByStatus(Boolean status);
}
