package com.example.labsdi.controller;

import com.example.labsdi.domain.Client;
import com.example.labsdi.domain.dto.ClientDTO;
import com.example.labsdi.domain.dto.Count;
import com.example.labsdi.domain.dto.SimpleClientDTO;
import com.example.labsdi.jwt.JwtTokenUtil;
import com.example.labsdi.service.ClientService;
import com.example.labsdi.service.IClientService;
import com.example.labsdi.service.exception.ClientServiceException;
import io.jsonwebtoken.Jwts;
import io.swagger.v3.core.util.Json;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpRequest;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ClientController {
    @Autowired
    private IClientService clientService;

    @PostMapping("/clients")
    public Client addClient(@RequestBody @Valid Client client) throws ClientServiceException {
        return clientService.addClient(client);
    }

    @GetMapping("/clients/all")
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @GetMapping("/clients")
    public List<Client> getFirst100Clients() {
        return clientService.getFirst100Clients();
    }

    @GetMapping("/clients/page/{page}")
    public Slice<ClientDTO> getClientsPage(@PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return clientService.getClientsPage(page)
                .map(c -> (ClientDTO) c.toDTO());
    }

    @GetMapping("/clients/page/{page}/{username}")
    public Slice<ClientDTO> getClientsPageByUsername(
            @PathVariable("page") @NotNull @PositiveOrZero Integer page,
            @PathVariable("username") @NotBlank String username
    ) {
        return clientService.getClientsPageByUsername(page, username)
                .map(c -> (ClientDTO) c.toDTO());
    }

    @GetMapping("/clients/simple/page/{page}")
    public Slice<SimpleClientDTO> getClientsSimplePage(@PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return clientService.getClientsPage(page)
                .map(c -> (SimpleClientDTO) c.toSimpleDTO());
    }

    @GetMapping("/clients/count")
    public Count getCount() {
        return new Count(clientService.getCount());
    }

    @GetMapping("/clients/count/{username}")
    public Count getCountByUsername(@PathVariable("username") @NotBlank String username) {
        return new Count(clientService.getCountByUsername(username));
    }


    @GetMapping("/clients/containsName/{name}/page/{page}")
    public Slice<SimpleClientDTO> getClientContainsNamePage(@PathVariable("name") @NotBlank String name,
                                                            @PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return clientService.getClientContainsNamePage(name, page)
                .map(c -> (SimpleClientDTO) c.toSimpleDTO());
    }

    @PutMapping("/clients/{id}")
    public ResponseEntity<?>
    updateClient(@RequestHeader(HttpHeaders.AUTHORIZATION) String header,
            @RequestBody Client client,
                 @PathVariable("id") Long id) throws ClientServiceException {

        String username = JwtTokenUtil.getUsernameFromAuthorizationHeader(header);
        Client retrievedClient = clientService.getClient(id);
        if (retrievedClient.getUser().getUsername().equals(username) ||
                JwtTokenUtil.getRolesFromAuthorizationHeader(header).contains("MODERATOR"))
            return ResponseEntity.ok().body(clientService.updateClient(client, id));
        else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @DeleteMapping("/clients/{id}")
    public ResponseEntity<?> removeClient(@RequestHeader(HttpHeaders.AUTHORIZATION) String header,
                               @PathVariable("id") Long id) throws ClientServiceException {

        String username = JwtTokenUtil.getUsernameFromAuthorizationHeader(header);
        Client retrievedClient = clientService.getClient(id);
        if (retrievedClient.getUser().getUsername().equals(username) ||
                JwtTokenUtil.getRolesFromAuthorizationHeader(header).contains("MODERATOR")) {
            clientService.removeClient(id);
            return ResponseEntity.ok().body("Deleted Successfully");
        }
        else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @GetMapping("/clients/{id}")
    public Client getClient(@PathVariable("id") @NotNull Long id) throws ClientServiceException {
        return clientService.getClient(id);
    }
}
