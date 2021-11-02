package com.sgifdbackend.demo.parametrage.dao;


import com.sgifdbackend.demo.parametrage.entites.GrandSecteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrandSecteurDao extends JpaRepository<GrandSecteur, Long> {
    List<GrandSecteur> findByStatus(Boolean status);
}
