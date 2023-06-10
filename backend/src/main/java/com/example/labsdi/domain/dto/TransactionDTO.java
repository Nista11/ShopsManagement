package com.example.labsdi.domain.dto;

import com.example.labsdi.domain.Client;
import com.example.labsdi.domain.Product;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.*;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionDTO extends DTO {
    private Long id;
    private SimpleGuitarDTO product;
    private SimpleClientDTO client;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date date;
    private Boolean isCashPayment;
    private UserDTO user;
}
