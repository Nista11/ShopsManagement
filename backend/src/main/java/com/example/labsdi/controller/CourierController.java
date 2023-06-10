package com.example.labsdi.controller;

import com.example.labsdi.domain.Authority;
import com.example.labsdi.domain.Courier;
import com.example.labsdi.domain.User;
import com.example.labsdi.domain.dto.*;
import com.example.labsdi.jwt.JwtTokenUtil;
import com.example.labsdi.service.ICourierService;
import com.example.labsdi.service.ICourierService;
import com.example.labsdi.service.exception.CourierServiceException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CourierController {
    @Autowired
    private ICourierService courierService;

    @PostMapping("/couriers")
    public Courier addCourier(@Valid @RequestBody Courier courier) throws CourierServiceException {
        return courierService.addCourier(courier);
    }

    @GetMapping("/couriers/all")
    public List<Courier> getAllCouriers() {
        return courierService.getAllCouriers();
    }

    @GetMapping("/couriers")
    public List<Courier> getFirst100Couriers() {
        return courierService.getFirst100Couriers();
    }

    @GetMapping("/couriers/page/{page}")
    public Slice<CourierDTO> getCouriersPage(@PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return courierService.getCourierPage(page)
                .map(c -> (CourierDTO)c.toDTO());
    }

    @GetMapping("/couriers/simple/page/{page}")
    public Slice<SimpleCourierDTO> getSimpleCouriersPage(@PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return courierService.getCourierPage(page)
                .map(c -> (SimpleCourierDTO)c.toSimpleDTO());
    }

    @GetMapping("/couriers/containsName/{name}/page/{page}")
    public Slice<SimpleCourierDTO> getCourierContainsNamePage(@PathVariable("name") @NotBlank String name,
                                                              @PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return courierService.getCourierContainsNamePage(name, page)
                .map(c -> (SimpleCourierDTO) c.toSimpleDTO());
    }

    @GetMapping("/couriers/count")
    public Count getCount() {
        return new Count(courierService.getCount());
    }

    @GetMapping("/couriers/count/{username}")
    public Count getCountByUsername(@PathVariable("username") @NotBlank String username) {
        return new Count(courierService.countByUsername(username));
    }

    @PutMapping("/couriers/{id}")
    public ResponseEntity<?>
    updateCourier(
            @RequestHeader("Authorization") @NotBlank String authorization,
            @RequestBody Courier courier,
            @PathVariable("id") @NotNull Long id) throws CourierServiceException {

        String username = JwtTokenUtil.getUsernameFromAuthorizationHeader(authorization);
        Courier retrievedCourier = courierService.getCourier(id);
        User user = retrievedCourier.getUser();
        if (user.getUsername().equals(username) ||
                JwtTokenUtil.getRolesFromAuthorizationHeader(authorization).contains("MODERATOR")) {
            return ResponseEntity.ok().body(courierService.updateCourier(courier, id));
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @DeleteMapping("/couriers/{id}")
    public ResponseEntity<?> removeCourier(
            @RequestHeader("Authorization") @NotBlank String authorization,
            @PathVariable("id") @NotNull Long id) throws CourierServiceException {

        String username = JwtTokenUtil.getUsernameFromAuthorizationHeader(authorization);
        Courier retrievedCourier = courierService.getCourier(id);

        if (retrievedCourier.getUser().getUsername().equals(username)
        || JwtTokenUtil.getRolesFromAuthorizationHeader(authorization).contains("MODERATOR")) {
            courierService.removeCourier(id);
            return ResponseEntity.ok().body("Deleted Successfully");
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @GetMapping("/couriers/page/{page}/{username}")
    public Slice<CourierDTO> getCouriersPageByUsername(
            @PathVariable("page") @NotNull @PositiveOrZero Integer page,
            @PathVariable("username") @NotBlank String username
    ) {
        return courierService.getCouriersPageByUsername(page, username)
                .map(c -> (CourierDTO) c.toDTO());
    }

    @GetMapping("/couriers/{id}")
    public DTO getCourier(@PathVariable("id") @NotNull Long id) throws CourierServiceException {
        return courierService.getCourier(id).toDTO();
    }
}
