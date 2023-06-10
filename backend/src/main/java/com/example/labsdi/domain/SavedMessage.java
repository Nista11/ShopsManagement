package com.example.labsdi.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "saved_message")
public class SavedMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "saved_message_generator")
    @SequenceGenerator(name = "saved_message_generator", sequenceName = "saved_message_seq")
    private Long id;
    @Column(name="messageFrom")
    private String from;
    @Column(name="messageText")
    private String text;
    @Column(name="messageTime")
    private String time;
}
