package com.sgifdbackend.demo.parametrage.dao;



import com.sgifdbackend.demo.parametrage.entites.Arrondissement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ArrondissementDao extends JpaRepository<Arrondissement, Long> {

    List<Arrondissement> findByStatus(Boolean status);

    List<Arrondissement> findByCommune_id(Long id);
}
