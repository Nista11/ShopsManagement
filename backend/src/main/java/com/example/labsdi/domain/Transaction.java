package com.example.labsdi.domain;

import com.example.labsdi.domain.dto.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction extends UserCreated implements IDTOConvertable {
    @OneToOne
    @JoinColumn(name="product_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull(message = "Product is mandatory")
    private Product product;
    @ManyToOne
    @JoinColumn(name="client_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull(message = "Client is mandatory")
    private Client client;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date date;
    private Boolean isCashPayment;

    @Override
    public DTO toDTO() {
        TransactionDTO tdto = new TransactionDTO();
        tdto.setId(id);
        tdto.setProduct((SimpleGuitarDTO) product.toSimpleDTO());
        tdto.setClient((SimpleClientDTO) client.toSimpleDTO());
        tdto.setDate(date);
        tdto.setIsCashPayment(isCashPayment);
        tdto.setUser((UserDTO) user.toSimpleDTO());
        return tdto;
    }
}
