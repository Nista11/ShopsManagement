package com.example.labsdi.domain.dto;

import com.example.labsdi.domain.Courier;
import com.example.labsdi.domain.Guitar;
import com.example.labsdi.domain.Product;
import com.example.labsdi.domain.Shop;
import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShopDTO extends DTO {
    protected List<SimpleGuitarDTO> products;
    protected List<SimpleCourierDTO> couriers;
    protected Long id;
    protected String name;
    protected String address;
    protected String email;
    protected String telephoneNumber;
    protected Boolean shippingAvailable;
    private UserDTO user;
}
