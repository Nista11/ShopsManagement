package com.example.labsdi.domain.dto;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO extends SimpleDTO {
    private String username;
}
