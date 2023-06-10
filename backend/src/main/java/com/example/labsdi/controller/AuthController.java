package com.example.labsdi.controller;

import com.example.labsdi.domain.AuthRequest;
import com.example.labsdi.domain.AuthResponse;
import com.example.labsdi.domain.RegisterRequest;
import com.example.labsdi.domain.User;
import com.example.labsdi.jwt.JwtTokenUtil;
import com.example.labsdi.service.IUserService;
import com.example.labsdi.service.exception.UserServiceException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    IUserService userService;
    @Autowired
    AuthenticationManager authManager;
    @Autowired
    JwtTokenUtil jwtUtil;

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) throws UserServiceException {
        try {
            User newUser = userService.register(request);
            return ResponseEntity.ok().body(newUser);
        }
        catch (UserServiceException exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    "{\"message\": \"" + exception.getLocalizedMessage() + "\"}");
        }
    }

    @GetMapping("/auth/register/confirm/{code}")
    public ResponseEntity<?> confirmRegistration(@PathVariable("code") @NotBlank String code) {
        if (userService.confirmRegistration(code))
            return ResponseEntity.ok().body("{\"message\": \"user registration confirmed\"}");
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"confirmation code not valid\"}");
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(), request.getPassword())
            );
            User user = (User) authentication.getPrincipal();
            String accessToken = jwtUtil.generateAccessToken(user);
            AuthResponse response = new AuthResponse(user.getUsername(), accessToken,
                    user.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority).toList());

            return ResponseEntity.ok().body(response);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Invalid credentials!\"}");
        }
    }
}
