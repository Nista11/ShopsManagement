package com.example.labsdi.domain.dto;

import com.example.labsdi.domain.Shop;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourierDTO extends DTO{
    protected Long id;
    private String name;
    private String address;
    private String email;
    private String telephoneNumber;
    private Integer deliveryPrice;
    private String description;
    private UserDTO user;
}
