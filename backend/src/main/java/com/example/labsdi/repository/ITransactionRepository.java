package com.example.labsdi.repository;

import com.example.labsdi.domain.Guitar;
import com.example.labsdi.domain.Transaction;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findFirst100By();
    Slice<Transaction> findAllBy(Pageable pageable);
    Slice<Transaction> findAllByUser_Username(Pageable pageable, String username);
    Integer countAllByUser_Username(String username);
}
