package com.example.labsdi.domain;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "productType", include = JsonTypeInfo.As.EXISTING_PROPERTY,
    visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Guitar.class, name = "guitar")
})
@Table(name="product", indexes = {@Index(name="shop_id_index", columnList = "shop_id"),
@Index(name = "price_index_product", columnList = "price")})
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Product extends UserCreated implements IDTOConvertable, ISimpleDTOConvertable {
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="shop_id",  nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.PUBLIC)
    @NotNull(message = "Shop is mandatory")
    protected Shop shop;
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.PUBLIC)
    @PositiveOrZero(message = "Price cannot be a negative value")
    @Column(name="price")
    protected Integer price;
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.PUBLIC)
    @Column(name="dtype")
    @NotNull
    protected String productType;
}
