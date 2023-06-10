package com.example.labsdi.domain.dto;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SimpleCourierDTO extends SimpleDTO {
    protected Long id;
    private String name;
}
