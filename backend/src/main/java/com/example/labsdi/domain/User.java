package com.example.labsdi.domain;

import com.example.labsdi.domain.dto.DTO;
import com.example.labsdi.domain.dto.SimpleDTO;
import com.example.labsdi.domain.dto.UserDTO;
import com.example.labsdi.domain.dto.UserWithRolesDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_table", indexes = @Index(name = "user_username_index", columnList = "username"))
public class User implements UserDetails, IDTOConvertable, ISimpleDTOConvertable
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_table_generator")
    @SequenceGenerator(name = "user_table_generator", sequenceName = "user_table_seq")
    private Long id;
    @Column(name="username", nullable = false)
    @NotBlank
    private String username;
    @Column(name="password", nullable = false)
    @NotBlank
    private String password;
    @Column(name="email", nullable = false)
    @NotBlank
    @Email
    private String email;
    @Column(name="nickname")
    private String nickname;
    @Column(name="confirmation_code", length = 8)
    private String confirmationCode;
    @Column(name="confirmation_code_set_time")
    private Long confirmationCodeSetTime;
    @Column(name="isEnabled", nullable = false)
    @NotNull
    private Boolean isEnabled;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_authority",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            foreignKey = @ForeignKey(name="fk_authority_id",
                    foreignKeyDefinition = "FOREIGN KEY (authority_id) REFERENCES authority(id) ON DELETE CASCADE"),
            inverseJoinColumns = @JoinColumn(name = "authority_id", referencedColumnName = "id"),
            inverseForeignKey = @ForeignKey(name="fk_user_id",
                    foreignKeyDefinition = "FOREIGN KEY (user_id) REFERENCES user_table(id) ON DELETE CASCADE"),
            indexes = {@Index(name = "user_id_user_authority_index", columnList = "user_id")}
    )
    private List<Authority> roles;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

    @Override
    public DTO toDTO() {
        return new UserWithRolesDTO(
                username,
                roles.stream().map(Authority::getAuthority).toList()
        );
    }

    @Override
    public SimpleDTO toSimpleDTO() {
        return new UserDTO(username);
    }
}
