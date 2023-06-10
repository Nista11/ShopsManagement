package com.example.labsdi.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientDTO extends DTO {
    private Long id;
    private String name;
    private String email;
    private String telephoneNumber;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date birthDate;
    private UserDTO user;
}
