package com.example.labsdi.controller;

import com.example.labsdi.domain.IDTOConvertable;
import com.example.labsdi.domain.Transaction;
import com.example.labsdi.domain.dto.Count;
import com.example.labsdi.domain.dto.DTO;
import com.example.labsdi.domain.dto.SortedShopDTO;
import com.example.labsdi.domain.dto.TransactionDTO;
import com.example.labsdi.jwt.JwtTokenUtil;
import com.example.labsdi.service.ITransactionService;
import com.example.labsdi.service.exception.TransactionServiceException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TransactionController {
    @Autowired
    ITransactionService transactionService;
    @PostMapping("/transactions")
    public Transaction
    addTransaction(@Valid @RequestBody Transaction transaction) throws TransactionServiceException {
        return transactionService.addTransaction(transaction);
    }

    @GetMapping("/transactions/all")
    public List<DTO> getAllTransactions() {
        return transactionService.getAllTransactions().stream()
                .map(IDTOConvertable::toDTO)
                .toList();
    }

    @GetMapping("/transactions/page/{page}")
    public Slice<TransactionDTO> getTransactionsPage(@PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return transactionService.getTransactionsPage(page)
                .map(t -> (TransactionDTO)t.toDTO());
    }

    @GetMapping("/transactions/page/{page}/{username}")
    public Slice<TransactionDTO> getTransactionsPageByUsername(
            @PathVariable("page") @NotNull @PositiveOrZero Integer page,
            @PathVariable("username") @NotBlank String username) {
        return transactionService.getTransactionsPageByUsername(page, username)
                .map(t -> (TransactionDTO) t.toDTO());
    }

    @GetMapping("/transactions")
    public List<DTO> getFirst100Transactions() {
        return transactionService.getFirst100Transactions().stream()
                .map(IDTOConvertable::toDTO)
                .toList();
    }

    @PutMapping("/transactions/{id}")
    public ResponseEntity<?>
    updateTransaction(
            @RequestHeader("Authorization") String authorization,
            @RequestBody @Valid Transaction transaction, @PathVariable("id") @NotNull @PositiveOrZero Long id)
            throws TransactionServiceException {

        String username = JwtTokenUtil.getUsernameFromAuthorizationHeader(authorization);
        Transaction retrievedTransaction = transactionService.getTransaction(id);

        if (retrievedTransaction.getUser().getUsername().equals(username) ||
                JwtTokenUtil.getRolesFromAuthorizationHeader(authorization).contains("MODERATOR")) {
            return ResponseEntity.ok(transactionService.updateTransaction(transaction, id));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @DeleteMapping("/transactions/{id}")
    public ResponseEntity<?> removeTransaction(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("id") @NotNull @PositiveOrZero Long id) throws TransactionServiceException {

        String username = JwtTokenUtil.getUsernameFromAuthorizationHeader(authorization);
        Transaction retrievedTransaction = transactionService.getTransaction(id);

        if (retrievedTransaction.getUser().getUsername().equals(username) ||
                JwtTokenUtil.getRolesFromAuthorizationHeader(authorization).contains("MODERATOR")) {
            transactionService.removeTransaction(id);
            return ResponseEntity.ok("Deleted Successfully");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @GetMapping("/transactions/{id}")
    public Transaction getTransaction(@PathVariable("id") @NotNull @PositiveOrZero Long id) throws TransactionServiceException {
        return transactionService.getTransaction(id);
    }

    @GetMapping("/transactions/count")
    public Count getCount() {
        return new Count(transactionService.getCount());
    }

    @GetMapping("/transactions/count/{username}")
    public Count countByUsername(@PathVariable("username") @NotBlank String username) {
        return new Count(transactionService.countByUsername(username));
    }

    @GetMapping("/transactions/dto/{id}")
    public TransactionDTO getTransactionDTO(@PathVariable("id") @NotNull @PositiveOrZero Long id) throws TransactionServiceException {
        return (TransactionDTO) transactionService.getTransaction(id).toDTO();
    }

    @GetMapping("/shops/sorted")
    public List<SortedShopDTO> getAllShopsSorted() {
        return transactionService.getAllShopsSorted();
    }
}
