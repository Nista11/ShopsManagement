package com.example.labsdi.domain.dto;

import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SimpleShopDTO extends SimpleDTO {
    protected Long id;
    protected String name;
}
