package com.example.labsdi.controller;

import com.example.labsdi.domain.Courier;
import com.example.labsdi.domain.Guitar;
import com.example.labsdi.domain.Shop;
import com.example.labsdi.domain.dto.*;
import com.example.labsdi.jwt.JwtTokenUtil;
import com.example.labsdi.service.IShopService;
import com.example.labsdi.service.exception.ShopServiceException;
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
public class ShopController {
    @Autowired
    private IShopService shopService;

    @PostMapping("/shops")
    public Shop addShop(@Valid @RequestBody Shop shop) throws ShopServiceException {
        return shopService.addShop(shop);
    }

    @GetMapping("/shops/all")
    public List<ShopDTO> getAllShops() {
        return shopService.getAllShops().stream()
                .map(s -> (ShopDTO)s.toDTO())
                .toList();
    }

    @GetMapping("/shops/page/{page}")
    public Slice<ShowAllShopDTO> getShopPage(@PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return shopService.getShopsPage(page)
                .map(s -> (ShowAllShopDTO) s.toShowAllDTO());
    }

    @GetMapping("/shops/page/{page}/{username}")
    public Slice<ShowAllShopDTO> getShopPageByUsername(
            @PathVariable("page") @NotNull @PositiveOrZero Integer page,
            @PathVariable("username") @NotBlank String username
            ) {
        return shopService.getShopsPageByUsername(page, username)
                .map(s -> (ShowAllShopDTO) s.toShowAllDTO());
    }

    @GetMapping("/shops/simple/page/{page}")
    public Slice<SimpleShopDTO> getSimpleShopPage(@PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return shopService.getShopsPage(page)
                .map(s -> (SimpleShopDTO)s.toSimpleDTO());
    }

    @GetMapping("/shops/containsName/{name}/page/{page}")
    public Slice<SimpleShopDTO> getShopContainsNamePage(@PathVariable("name") @NotBlank String name,
                                                        @PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return shopService.getShopContainsNamePage(page, name)
                .map(s -> (SimpleShopDTO) s.toSimpleDTO());
    }

    @GetMapping("/shops")
    public List<ShopDTO> getFirst100Shops() {
        return shopService.getFirst100Shops().stream()
                .map(s -> (ShopDTO)s.toDTO())
                .toList();
    }

    @PutMapping("/shops/{id}")
    public ResponseEntity<?>
    updateShop(
            @RequestHeader("Authorization") String authorization,
            @RequestBody Shop shop,
            @PathVariable("id") @NotNull Long id) throws ShopServiceException {

        String username = JwtTokenUtil.getUsernameFromAuthorizationHeader(authorization);
        Shop retrievedShop = shopService.getShop(id);

        if (retrievedShop.getUser().getUsername().equals(username) ||
                JwtTokenUtil.getRolesFromAuthorizationHeader(authorization).contains("MODERATOR")) {
            return ResponseEntity.ok(shopService.updateShop(shop, id));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @PutMapping("/shops/{id}/addCourier")
    public ResponseEntity<?> addCourier(
            @RequestHeader("Authorization") String authorization,
            @RequestBody Courier courier, @PathVariable("id") @NotNull Long id) throws ShopServiceException {
        String username = JwtTokenUtil.getUsernameFromAuthorizationHeader(authorization);
        Shop retrievedShop = shopService.getShop(id);

        if (retrievedShop.getUser().getUsername().equals(username) ||
                JwtTokenUtil.getRolesFromAuthorizationHeader(authorization).contains("MODERATOR")) {
            return ResponseEntity.ok(shopService.addCourier(courier, id));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @DeleteMapping("/shops/{shopId}/removeCourier/{courierId}")
    public ResponseEntity<?> removeCourier(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("shopId") @NotNull Long shopId,
            @PathVariable("courierId") @NotNull Long courierId) throws ShopServiceException {

        String username = JwtTokenUtil.getUsernameFromAuthorizationHeader(authorization);
        Shop retrievedShop = shopService.getShop(shopId);

        if (retrievedShop.getUser().getUsername().equals(username) ||
                JwtTokenUtil.getRolesFromAuthorizationHeader(authorization).contains("MODERATOR")) {
            return ResponseEntity.ok(shopService.removeCourier(shopId, courierId));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @DeleteMapping("/shops/{id}")
    public ResponseEntity<?> removeShop(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("id") @NotNull Long id) throws ShopServiceException {

        String username = JwtTokenUtil.getUsernameFromAuthorizationHeader(authorization);
        Shop retrievedShop = shopService.getShop(id);

        if (retrievedShop.getUser().getUsername().equals(username) ||
                JwtTokenUtil.getRolesFromAuthorizationHeader(authorization).contains("MODERATOR")) {
            shopService.removeShop(id);
            return ResponseEntity.ok("Deleted Successfully");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @GetMapping("/shops/{id}")
    public DTO getShop(@PathVariable("id") @NotNull Long id) throws ShopServiceException {
        return shopService.getShop(id).toDTO();
    }

    @GetMapping("/shops/count")
    public Count getCount() {
        return new Count(shopService.getCount());
    }

    @GetMapping("/shops/count/{username}")
    public Count countByUsername(@PathVariable("username") @NotBlank String username) {
        return new Count(shopService.countByUsername(username));
    }

    @GetMapping("/shops/orderByAveragePrice/all")
    public List<ShopAveragePriceDTO> getAllShopsOrderByAverageProductsPrice() {
        return shopService.getAllShopsOrderByAverageProductsPrice();
    }

    @GetMapping("/shops/orderByAveragePrice")
    public List<ShopAveragePriceDTO> getFirst100ShopsOrderByAverageProductsPrice() {
        return shopService.getFirst100ShopsOrderByAverageProductsPrice();
    }

    @GetMapping("/shops/orderByAveragePrice/page/{page}")
    public Slice<ShopAveragePriceDTO> getShopsByAvgPricePage(@PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return shopService.getShopsByAveragePricePage(page);
    }
}
