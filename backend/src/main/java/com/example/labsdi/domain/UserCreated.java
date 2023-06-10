package com.example.labsdi.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name="user_created", indexes = {@Index(name="user_id_index", columnList = "user_id")})
public abstract class UserCreated {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_created_generator")
    @SequenceGenerator(name = "user_created_generator", sequenceName = "user_created_seq")
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.PUBLIC)
    protected Long id;
    @JoinColumn(name="user_id", nullable = false)
    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @Setter(AccessLevel.PUBLIC)
    @Getter(AccessLevel.PUBLIC)
    protected User user;
}
