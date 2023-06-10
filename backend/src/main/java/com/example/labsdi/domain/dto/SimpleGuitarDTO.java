package com.example.labsdi.domain.dto;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SimpleGuitarDTO extends SimpleDTO {
    private Long id;
    private String model;
}
