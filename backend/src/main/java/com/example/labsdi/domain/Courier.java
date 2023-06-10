package com.example.labsdi.domain;

import com.example.labsdi.domain.dto.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.format.annotation.NumberFormat;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="courier")
public class Courier extends UserCreated implements IDTOConvertable, ISimpleDTOConvertable {
    @ManyToMany(mappedBy = "couriers", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Shop> shops;
    @Column(name="name")
    private String name;
    @Column(name="address")
    private String address;
    @Column(name="email")
    @Email
    @NotBlank
    private String email;
    @Column(name="telephone_number")
    @Pattern(regexp = "^\\+?\\d+$")
    private String telephoneNumber;
    @Column(name="delivery_price")
    @PositiveOrZero
    private Integer deliveryPrice;
    @Column(name="description")
    private String description;

    @Override
    public DTO toDTO() {
        CourierDTO courierdto = new CourierDTO();
        courierdto.setId(id);
        courierdto.setName(name);
        courierdto.setAddress(address);
        courierdto.setEmail(email);
        courierdto.setTelephoneNumber(telephoneNumber);
        courierdto.setDeliveryPrice(deliveryPrice);
        courierdto.setDescription(description);
        courierdto.setUser((UserDTO) user.toSimpleDTO());

        return courierdto;
    }

    @Override
    public SimpleDTO toSimpleDTO() {
        SimpleCourierDTO scourierdto = new SimpleCourierDTO();
        scourierdto.setId(id);
        scourierdto.setName(name);
        return scourierdto;
    }
}
