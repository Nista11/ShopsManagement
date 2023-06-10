package com.example.labsdi.repository;

import com.example.labsdi.domain.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Slice<User> findAllBy(Pageable pageable);
    Optional<User> findByEmail(String email);
    Optional<User> findByConfirmationCode(String confirmationCode);
}
