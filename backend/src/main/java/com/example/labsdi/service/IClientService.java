package com.example.labsdi.service;

import com.example.labsdi.domain.Client;
import com.example.labsdi.domain.Guitar;
import com.example.labsdi.domain.dto.ClientDTO;
import com.example.labsdi.service.exception.ClientServiceException;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface IClientService {
    boolean containsClient(Long id);
    Client addClient(Client client) throws ClientServiceException;
    Client getClient(Long id) throws ClientServiceException;
    Integer getCount();
    Integer getCountByUsername(String username);
    List<Client> getFirst100Clients();
    Slice<Client> getClientsPage(Integer page);
    Slice<Client> getClientsPageByUsername(Integer page, String username);
    Slice<Client> getClientContainsNamePage(String name, Integer page);
    void removeClient(Long id) throws ClientServiceException;
    Client updateClient(Client client, Long id) throws ClientServiceException;
    List<Client> getAllClients();
}
