package com.example.labsdi.repository;

import com.example.labsdi.domain.AppConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAppConfigurationRepository extends JpaRepository<AppConfiguration, Long> {
}
