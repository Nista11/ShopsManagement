package com.example.labsdi.repository;

import com.example.labsdi.domain.Guitar;
import com.example.labsdi.domain.Shop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IShopRepository extends JpaRepository<Shop, Long> {
    List<Shop> findFirst100By();
    Slice<Shop> findAllBy(Pageable pageable);
    Slice<Shop> findAllByUser_Username(Pageable pageable, String username);
    Slice<Shop> findByOrderByAverageProductPriceFieldDesc(Pageable pageable);
    Slice<Shop> findAllByNameContainingIgnoreCase(Pageable pageable, String name);
    Integer countAllByUser_Username(String username);
}
