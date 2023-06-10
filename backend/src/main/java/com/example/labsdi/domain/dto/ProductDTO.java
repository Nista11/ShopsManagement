package com.example.labsdi.domain.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

public abstract class ProductDTO extends DTO {
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.PUBLIC)
    protected Integer price;
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.PUBLIC)
    protected UserDTO user;
}
