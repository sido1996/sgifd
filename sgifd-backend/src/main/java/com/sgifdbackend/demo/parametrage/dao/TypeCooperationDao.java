package com.sgifdbackend.demo.parametrage.dao;

import com.sgifdbackend.demo.parametrage.entites.TypeCooperation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeCooperationDao extends JpaRepository<TypeCooperation, Long> {

    List<TypeCooperation> findByStatus(Boolean status);
}
