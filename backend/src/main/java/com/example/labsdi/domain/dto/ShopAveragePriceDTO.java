package com.example.labsdi.domain.dto;

import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShopAveragePriceDTO extends ShowAllShopDTO {
    private Double averageProductPrice;

    @Builder(builderMethodName = "ShopAveragePriceBuilder")
    public ShopAveragePriceDTO(ShowAllShopDTO stdo, Double averageProductPrice) {
        super(stdo.products, stdo.couriers, stdo.id, stdo.name, stdo.email, stdo.telephoneNumber, stdo.user);
        this.averageProductPrice = averageProductPrice;
    }
}
