package com.example.labsdi.domain.dto;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Count extends DTO {
    private Integer count;
}
