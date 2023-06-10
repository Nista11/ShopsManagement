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
@Table(name="app_configuration")
public class AppConfiguration {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "app_configuration_generator")
    @SequenceGenerator(name = "app_configuration_generator", sequenceName = "app_configuration_seq")
    private Long id;
    @Column(name="entries_per_page")
    private Long entriesPerPage;
}
