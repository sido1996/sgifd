package com.sgifdbackend.demo.parametrage.dao;


import  com.sgifdbackend.demo.parametrage.entites.DBFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DBFileDao extends JpaRepository<DBFile, String> {

}
