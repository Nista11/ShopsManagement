package com.example.labsdi.service;

import com.example.labsdi.domain.*;
import com.example.labsdi.domain.dto.SortedShopDTO;
import com.example.labsdi.repository.IAppConfigurationRepository;
import com.example.labsdi.repository.ITransactionRepository;
import com.example.labsdi.service.exception.TransactionServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TransactionService implements ITransactionService {
    @Autowired
    ITransactionRepository repository;
    @Autowired
    IAppConfigurationRepository appConfigurationRepository;
    @Override
    public boolean containsTransaction(Long id) {
        return repository.existsById(id);
    }

    @Override
    public Transaction addTransaction(Transaction transaction) throws TransactionServiceException {
        if (Objects.nonNull(transaction.getId()) && containsTransaction(transaction.getId()))
            throw new TransactionServiceException("Transaction with id " + transaction.getId()
                    + " already exists!");
        if (Objects.nonNull(transaction.getProduct()) && containsProduct(transaction.getProduct()))
            throw new TransactionServiceException("Product with id " + transaction.getProduct().getId()
                    + " already exists in a transaction!");
        return repository.save(transaction);
    }

    @Override
    public Transaction getTransaction(Long id) throws TransactionServiceException {
        Optional<Transaction> transaction = repository.findById(id);
        if (transaction.isEmpty())
            throw new TransactionServiceException("Transaction with id " + id + " does not exist!");
        else
            return transaction.get();
    }

    @Override
    public List<Transaction> getFirst100Transactions() {
        return repository.findFirst100By();
    }

    @Override
    public void removeTransaction(Long id) throws TransactionServiceException {
        if (!containsTransaction(id))
            throw new TransactionServiceException("Transaction with id " + id + " does not exist!");
        repository.deleteById(id);
    }

    @Override
    public Transaction updateTransaction(Transaction transaction, Long id) throws TransactionServiceException {
        Optional<Transaction> transactionOpt = repository.findById(id);
        if (transactionOpt.isEmpty()) {
            throw new TransactionServiceException("Transaction with id " + id + " does not exist!");
        }
        Transaction retrievedTransaction= transactionOpt.get();
        if (Objects.nonNull(transaction.getProduct())) {
            if (containsProduct(transaction.getProduct()) &&
                    (Objects.isNull(retrievedTransaction.getProduct()) ||
                            !Objects.equals(retrievedTransaction.getProduct().getId(), transaction.getProduct().getId())))
                throw new TransactionServiceException("Product with id " + id
                        + " already exists in a transaction!");
            else retrievedTransaction.setProduct(transaction.getProduct());
        }
        if (Objects.nonNull(transaction.getDate()))
            retrievedTransaction.setDate(transaction.getDate());
        if (Objects.nonNull(transaction.getIsCashPayment()))
            retrievedTransaction.setIsCashPayment(transaction.getIsCashPayment());
        if (Objects.nonNull(transaction.getClient()))
            retrievedTransaction.setClient(transaction.getClient());
        return repository.save(retrievedTransaction);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    @Override
    public Slice<Transaction> getTransactionsPage(Integer page) {
        return repository.findAllBy(PageRequest.of(page, Math.toIntExact(appConfigurationRepository.findAll().get(0).getEntriesPerPage())));
    }

    @Override
    public Slice<Transaction> getTransactionsPageByUsername(Integer page, String username) {
        return repository.findAllByUser_Username(PageRequest.of(page, Math.toIntExact(appConfigurationRepository.findAll().get(0).getEntriesPerPage())), username);
    }

    @Override
    public boolean containsProduct(Product product) {
        return getAllTransactions().stream()
                .anyMatch(t -> t.getProduct().getClass().equals(product.getClass())
                        && t.getProduct().getId().equals(product.getId()));
    }

    @Override
    public Integer getCount() {
        return Long.valueOf(repository.count()).intValue();
    }

    @Override
    public Integer countByUsername(String username) {
        return repository.countAllByUser_Username(username);
    }

    @Override
    public List<SortedShopDTO> getAllShopsSorted() {
        List<SortedShopDTO> finalShopList = new ArrayList<>();
        HashMap<Shop, List<Client>> shops = new HashMap<>();
        HashMap<Client, List<Shop>> clients = new HashMap<>();
        for (Transaction t : getAllTransactions()) {
            Shop shop = t.getProduct().getShop();
            Client client = t.getClient();

            if (!shops.containsKey(shop)) {
                shops.put(shop, new ArrayList<>(List.of(client)));
                finalShopList.add(new SortedShopDTO(shop, 0));
            }
            else if (!shops.get(shop).contains(client))
                shops.get(shop).add(client);

            if (!clients.containsKey(client))
                clients.put(client, new ArrayList<>(List.of(shop)));
            else if (!clients.get(client).contains(shop))
                clients.get(client).add(shop);
        }

        for (SortedShopDTO s : finalShopList) {
            s.setSortingNumber(
                    Math.toIntExact(shops.get(s.getShop()).stream()
                            .map(c -> clients.get(c).stream()
                                    .filter(s2 -> !s2.equals(s.getShop()))
                                    .count())
                            .reduce(0L, Long::sum))
            );
        }

        finalShopList.sort(Comparator.comparing(SortedShopDTO::getSortingNumber).reversed());
        return finalShopList;
    }
}
