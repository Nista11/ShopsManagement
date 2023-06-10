package com.example.labsdi.domain.dto;

import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShowAllShopDTO extends ShowAllDTO {
    protected Integer products;
    protected Integer couriers;
    protected Long id;
    protected String name;
    protected String email;
    protected String telephoneNumber;
    protected UserDTO user;
}
