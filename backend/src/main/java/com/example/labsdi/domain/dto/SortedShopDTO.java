package com.example.labsdi.domain.dto;

import com.example.labsdi.domain.Shop;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SortedShopDTO extends DTO {
    private Shop shop;
    private Integer sortingNumber;
}
