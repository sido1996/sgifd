package com.sgifdbackend.demo.ide.dao;


import com.sgifdbackend.demo.ide.entites.Ide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeDao extends JpaRepository<Ide,Long> {
    public Ide findIdeById(Long id);
    public Ide findByIdIs(Long id);
    List<Ide> findByStatus(Boolean status);
    public Ide findByStatusIsFalseAndId(long id);
}
