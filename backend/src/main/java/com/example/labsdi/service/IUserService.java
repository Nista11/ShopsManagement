package com.example.labsdi.service;

import com.example.labsdi.domain.RegisterRequest;
import com.example.labsdi.domain.User;
import com.example.labsdi.domain.UserProfile;
import com.example.labsdi.service.exception.UserServiceException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface IUserService extends UserDetailsService {
    UserDetails loadUserByEmail(String email);
    User register(RegisterRequest request) throws UserServiceException;
    Slice<User> getUsersPage(Integer page);
    String generateVerificationCode();
    Boolean confirmRegistration(String confirmationCode);
    UserProfile getUserProfile(String username);
    UserProfile updateUserProfile(UserProfile userProfile, String username);
    User updateUserRoles(String username, List<String> roles);

    Integer getUserCount();
    User setNickname(String username, String nickname);
    String getNickname(String username);
}
