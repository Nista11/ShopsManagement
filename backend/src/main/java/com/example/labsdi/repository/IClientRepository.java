package com.example.labsdi.repository;

import com.example.labsdi.domain.Client;
import com.example.labsdi.domain.Guitar;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IClientRepository extends JpaRepository<Client, Long> {
    List<Client> findFirst100By();
    Slice<Client> findAllBy(Pageable pageable);
    Slice<Client> findAllByUser_Username(Pageable pageable, String username);
    Slice<Client> findAllByNameContainingIgnoreCase(Pageable pageable, String name);
    Integer countAllBy();
    Integer countAllByUser_Username(String username);
}
