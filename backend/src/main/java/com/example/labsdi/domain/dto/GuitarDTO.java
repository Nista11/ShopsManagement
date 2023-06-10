package com.example.labsdi.domain.dto;

import com.example.labsdi.domain.Guitar;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GuitarDTO extends ProductDTO {
    private Long id;
    private SimpleShopDTO shop;
    private Integer creationYear;
    private String model;
    private String type;
    private String color;
}
