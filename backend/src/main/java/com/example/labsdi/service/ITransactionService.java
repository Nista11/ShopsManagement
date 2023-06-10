package com.example.labsdi.service;

import com.example.labsdi.domain.*;
import com.example.labsdi.domain.dto.SortedShopDTO;
import com.example.labsdi.service.exception.TransactionServiceException;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface ITransactionService {
    boolean containsTransaction(Long id);
    Transaction addTransaction(Transaction transaction) throws TransactionServiceException;
    Transaction getTransaction(Long id) throws TransactionServiceException;
    List<Transaction> getFirst100Transactions();
    void removeTransaction(Long id) throws TransactionServiceException;
    Transaction updateTransaction(Transaction transaction, Long id) throws TransactionServiceException;
    List<Transaction> getAllTransactions();
    Slice<Transaction> getTransactionsPage(Integer page);
    Slice<Transaction> getTransactionsPageByUsername(Integer page, String username);

    boolean containsProduct(Product product);

    Integer getCount();

    Integer countByUsername(String username);
    List<SortedShopDTO> getAllShopsSorted(); // sorted by the number of other shops their clients bought from
}
