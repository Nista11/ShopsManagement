package com.example.labsdi.controller;

import com.example.labsdi.domain.Guitar;
import com.example.labsdi.domain.Product;
import com.example.labsdi.domain.dto.Count;
import com.example.labsdi.domain.dto.GuitarDTO;
import com.example.labsdi.domain.dto.ProductDTO;
import com.example.labsdi.domain.dto.SimpleGuitarDTO;
import com.example.labsdi.jwt.JwtTokenUtil;
import com.example.labsdi.service.IGuitarService;
import com.example.labsdi.service.exception.GuitarServiceException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class GuitarController {
    @Autowired
    private IGuitarService guitarService;

    @GetMapping("/guitars")
    public List<ProductDTO> getFirst100Guitars() {
        return guitarService.getFirst100Guitars().stream()
                .map(g -> (ProductDTO)g.toDTO())
                .toList();
    }

    @GetMapping("/guitars/all")
    public List<ProductDTO> getAllGuitars() {
        return guitarService.getAllGuitars().stream()
                .map(g -> (ProductDTO)g.toDTO())
                .toList();
    }

    @GetMapping("/guitars/page/{page}")
    public Slice<ProductDTO> getGuitarsPage(@PathVariable("page") @NotNull Integer page) {
        return guitarService.getGuitarsPage(page)
                .map(g -> (ProductDTO)g.toDTO());
    }

    @GetMapping("/guitars/page/{page}/{username}")
    public Slice<ProductDTO> getGuitarsPageByUsername(@PathVariable("page") @NotNull Integer page,
                                                      @PathVariable("username") @NotBlank String username) {
        return guitarService.getGuitarsPageByUsername(page, username)
                .map(g -> (ProductDTO) g.toDTO());
    }

    @GetMapping("/guitars/simple/page/{page}")
    public Slice<SimpleGuitarDTO> getGuitarsSimplePage(@PathVariable("page") @NotNull Integer page) {
        return guitarService.getGuitarsPage(page)
                .map(g -> (SimpleGuitarDTO)g.toSimpleDTO());
    }

    @GetMapping("/guitars/priceGreaterThan/{price}/all")
    public List<ProductDTO> findByPriceGreaterThan(@PathVariable("price") @NotNull @PositiveOrZero Integer price) {
        return guitarService.findByPriceGreaterThan(price).stream()
                .map(g -> (ProductDTO)g.toDTO())
                .toList();
    }

    @GetMapping("/guitars/containsName/{name}/page/{page}")
    public Slice<SimpleGuitarDTO> getGuitarContainsNamePage(@PathVariable("name") @NotBlank String name,
                                                            @PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return guitarService.getGuitarContainsNamePage(name, page)
                .map(g -> (SimpleGuitarDTO) g.toSimpleDTO());
    }

    @GetMapping("/guitars/priceGreaterThan/{price}")
    public List<ProductDTO> findFirst100ByPriceGreaterThan(@PathVariable("price") @NotNull @PositiveOrZero Integer price) {
        return guitarService.findFirst100ByPriceGreaterThan(price).stream()
                .map(g -> (ProductDTO)g.toDTO())
                .toList();
    }

    @GetMapping("/guitars/priceGreaterThan/{price}/page/{page}")
    public Slice<ProductDTO> findByPriceGreaterThanPage(@PathVariable("price") @NotNull @PositiveOrZero Integer price,
                                                       @PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return guitarService.findByPriceGreaterThanPage(price, page)
                .map(g -> (ProductDTO)g.toDTO());
    }

    @GetMapping("/guitars/{id}")
    public Guitar getGuitar(@PathVariable("id") @NotNull Long id) throws GuitarServiceException {
        return guitarService.getGuitar(id);
    }

    @GetMapping("/guitars/count")
    public Count getCount() {
        return new Count(guitarService.getCount());
    }

    @GetMapping("/guitars/count/{username}")
    public Count getCountByUsername(@PathVariable("username") @NotBlank String username) {
        return new Count(guitarService.countGuitarsByUsername(username));
    }

    @GetMapping("/guitars/dto/{id}")
    public GuitarDTO getGuitarDTO(@PathVariable("id") @NotNull Long id) throws GuitarServiceException {
        return (GuitarDTO) guitarService.getGuitar(id).toDTO();
    }

    @PostMapping("/guitars")
    public Guitar addGuitar(@Valid @RequestBody Guitar guitar) throws GuitarServiceException {
        return guitarService.addGuitar(guitar);
    }

    @PostMapping("/shops/{id}/guitars")
    public ResponseEntity<?> addGuitarsToShop(
            @RequestHeader("Authorization") @NotBlank String authorization,
            @Valid @RequestBody List<Guitar> guitars,
            @PathVariable("id") @NotNull Long id) throws GuitarServiceException {
        String username = JwtTokenUtil.getUsernameFromAuthorizationHeader(authorization);
        Guitar retrievedGuitar = guitarService.getGuitar(id);

        if (retrievedGuitar.getUser().getUsername().equals(username)
                ||
                JwtTokenUtil.getRolesFromAuthorizationHeader(authorization).contains("MODERATOR")) {
            guitarService.addGuitarsToShop(guitars, id);
            return ResponseEntity.ok("Updated successfully");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @PutMapping("/guitars/{id}")
    public ResponseEntity<?>
    updateGuitar(
            @RequestHeader("Authorization") @NotBlank String authorization,
            @RequestBody @Valid Guitar guitar,
            @PathVariable("id") @NotNull Long id) throws GuitarServiceException {
        String username = JwtTokenUtil.getUsernameFromAuthorizationHeader(authorization);
        Guitar retrievedGuitar = guitarService.getGuitar(id);

        if (retrievedGuitar.getUser().getUsername().equals(username) ||
                JwtTokenUtil.getRolesFromAuthorizationHeader(authorization).contains("MODERATOR")) {
            return ResponseEntity.ok(guitarService.updateGuitar(guitar, id));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @DeleteMapping("/guitars/{id}")
    public ResponseEntity<?> removeGuitar(
            @RequestHeader("Authorization") @NotBlank String authorization,
            @PathVariable("id") @NotNull Long id) throws GuitarServiceException {
        String username = JwtTokenUtil.getUsernameFromAuthorizationHeader(authorization);
        Guitar retrievedGuitar = guitarService.getGuitar(id);

        if (retrievedGuitar.getUser().getUsername().equals(username) ||
                JwtTokenUtil.getRolesFromAuthorizationHeader(authorization).contains("MODERATOR")) {
            guitarService.removeGuitar(id);
            return ResponseEntity.ok().body("Deleted successfully");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
}
