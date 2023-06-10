package com.example.labsdi.domain.dto;

import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserWithRolesDTO extends DTO {
    private String username;
    private List<String> roles;
}
