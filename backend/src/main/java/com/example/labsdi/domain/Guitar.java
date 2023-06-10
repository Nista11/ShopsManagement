package com.example.labsdi.domain;

import com.example.labsdi.domain.dto.*;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Guitar extends Product {
    @Column(name="creation_year")
    @PositiveOrZero
    private Integer creationYear;
    @Column(name="model")
    @NotBlank
    private String model;
    @Column(name="type")
    private String type;
    @Column(name="color")
    private String color;

    @Builder(builderMethodName = "guitarBuilder")
    public Guitar(Long id, Shop shop, Integer price, Integer creationYear,
                  String model, String type, String color) {
        this.id = id;
        this.shop = shop;
        this.price = price;
        this.creationYear = creationYear;
        this.model = model;
        this.type = type;
        this.color = color;
    }

    @Builder(builderMethodName = "guitarBuilder2")
    public Guitar(Integer price, Integer creationYear,
                  String model, String type, String color) {
        this.price = price;
        this.creationYear = creationYear;
        this.model = model;
        this.type = type;
        this.color = color;
    }

    @Override
    public DTO toDTO() {
        GuitarDTO gdto = new GuitarDTO();
        gdto.setId(id);
        gdto.setType(type);
        gdto.setColor(color);
        gdto.setPrice(price);
        gdto.setModel(model);
        gdto.setCreationYear(creationYear);
        gdto.setShop((SimpleShopDTO) shop.toSimpleDTO());
        gdto.setUser((UserDTO) user.toSimpleDTO());
        return gdto;
    }

    @Override
    public SimpleDTO toSimpleDTO() {
        SimpleGuitarDTO sgdto = new SimpleGuitarDTO();
        sgdto.setId(id);
        sgdto.setModel(model);
        return sgdto;
    }
}
