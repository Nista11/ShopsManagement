package com.example.labsdi.repository;

import com.example.labsdi.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IAuthorityRepository extends JpaRepository<Authority, Long> {
    Optional<Authority> findFirstByRole(String role);
}
