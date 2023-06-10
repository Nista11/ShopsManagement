package com.example.labsdi.repository;

import com.example.labsdi.domain.SavedMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISavedMessageRepository extends JpaRepository<SavedMessage, Long> {
}
