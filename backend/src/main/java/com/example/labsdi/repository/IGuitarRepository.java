package com.example.labsdi.repository;

import com.example.labsdi.domain.Guitar;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGuitarRepository extends JpaRepository<Guitar, Long> {
    List<Guitar> findByPriceGreaterThan(int price);
    Slice<Guitar> findAllBy(Pageable pageable);
    Slice<Guitar> findAllByUser_Username(Pageable pageable, String username);
    Slice<Guitar> findAllByModelContainsIgnoreCase(Pageable pageable, String name);
    Slice<Guitar> findAllByPriceGreaterThan(Pageable pageable, Integer price);
    List<Guitar> findFirst100By();
    Integer countAllByUser_Username(String username);
}
