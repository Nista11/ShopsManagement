package com.example.labsdi.repository;

import com.example.labsdi.domain.Courier;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ICourierRepository extends JpaRepository<Courier, Long> {
    List<Courier> findFirst100By();
    Slice<Courier> findAllBy(Pageable pageable);
    Slice<Courier> findAllByUser_Username(Pageable pageable, String username);
    Slice<Courier> findAllByNameContainingIgnoreCase(Pageable pageable, String name);
    Integer countAllByUser_Username(String username);
}
