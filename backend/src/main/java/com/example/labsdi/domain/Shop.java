package com.example.labsdi.domain;

import com.example.labsdi.domain.dto.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.repository.Query;
import org.springframework.format.annotation.NumberFormat;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@EqualsAndHashCode(callSuper = true)
@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="shop")
public class Shop extends UserCreated implements IDTOConvertable, ISimpleDTOConvertable, IShowAllDTOConvertable {
    @OneToMany(mappedBy = "shop", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Product> products;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "shop_courier",
            joinColumns = @JoinColumn(name = "shop_id", referencedColumnName = "id"),
            foreignKey = @ForeignKey(name="fk_courier_id",
                    foreignKeyDefinition = "FOREIGN KEY (courier_id) REFERENCES courier(id) ON DELETE CASCADE"),
            inverseJoinColumns = @JoinColumn(name = "courier_id", referencedColumnName = "id"),
            inverseForeignKey = @ForeignKey(name="fk_shop_id",
                    foreignKeyDefinition = "FOREIGN KEY (shop_id) REFERENCES shop(id) ON DELETE CASCADE"),
            indexes = {@Index(name = "shop_id_shop_courier_index", columnList = "shop_id")}
    )
    //@JsonIgnore
    private List<Courier> couriers;
    @Column(name="name")
    private String name;
    @Column(name="address")
    private String address;
    @Column(name="email")
    @NotBlank(message = "Email is mandatory")
    @Email
    private String email;
    @Column(name="telephone_number")
    @Pattern(regexp = "^\\+?\\d+$")
    private String telephoneNumber;
    @Column(name="shipping_available")
    private Boolean shippingAvailable;
    @Formula(value="(SELECT COALESCE(AVG(product.price),0) FROM shop LEFT JOIN product ON shop.id=product.shop_id WHERE shop.id=id GROUP BY shop.id)")
    private Double averageProductPriceField;

    @Builder(builderMethodName = "shopBuilder")
    public Shop(Long id) {
        this.id = id;
    }

    @Override
    public DTO toDTO() {
        ShopDTO shopdto = new ShopDTO();
        shopdto.setId(id);
        shopdto.setName(name);
        shopdto.setAddress(address);
        shopdto.setEmail(email);
        shopdto.setTelephoneNumber(telephoneNumber);
        shopdto.setShippingAvailable(shippingAvailable);

        shopdto.setCouriers(couriers.stream().map(c -> (SimpleCourierDTO) c.toSimpleDTO()).toList());
        shopdto.setProducts(products.stream().map(p -> (SimpleGuitarDTO) p.toSimpleDTO()).toList());
        return shopdto;
    }

    @Override
    public SimpleDTO toSimpleDTO() {
        SimpleShopDTO sshopdto = new SimpleShopDTO();
        sshopdto.setId(id);
        sshopdto.setName(name);
        return sshopdto;
    }

    @Override
    public ShowAllDTO toShowAllDTO() {
        return ShowAllShopDTO.builder()
                .email(email)
                .telephoneNumber(telephoneNumber)
                .name(name)
                .id(id)
                .couriers(couriers.size())
                .products(products.size())
                .user((UserDTO) user.toSimpleDTO())
                .build();
    }

    public static Double getAveragePrice(Shop s) {
        return Objects.isNull(s.getProducts()) ? 0.0 :
                s.getProducts().stream()
                        .collect(Collectors.averagingInt(
                                p -> Objects.nonNull(p.getPrice()) ? p.getPrice() : 0
                        ));
    }

    public static ShopAveragePriceDTO toShopAveragePriceDTO(Shop s) {
        return new ShopAveragePriceDTO((ShowAllShopDTO) s.toShowAllDTO(), getAveragePrice(s));
    }
}
