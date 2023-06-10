package com.example.labsdi.jwt;

import java.util.Date;
import java.util.List;

import com.example.labsdi.domain.Authority;
import com.example.labsdi.domain.User;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenUtil {
    private static final long EXPIRE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    private static final String SECRET_KEY = "abcdefghijklmnOPQRSTUVWXYZ";

    public String generateAccessToken(User user) {
        Claims claims = Jwts.claims().setSubject(user.getUsername());
        claims.put("authorities", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuer("ShopApp")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE_DURATION))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        UserDetails userDetails = getUserDetailsFromToken(token);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            // log signature error
        } catch (MalformedJwtException ex) {
            // log token format error
        } catch (ExpiredJwtException ex) {
            // log token expired error
        } catch (UnsupportedJwtException ex) {
            // log unsupported token error
        } catch (IllegalArgumentException ex) {
            // log empty token error
        }
        return false;
    }

    private UserDetails getUserDetailsFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        String username = claims.getSubject();
        List<Authority> authorities = ((List<String>)claims.get("authorities")).stream()
                .map(Authority::new).toList();
        return User.builder()
                .username(username)
                .password("")
                .roles(authorities)
                .build();
    }

    public static String getUsernameFromAuthorizationHeader(String header) {
        if (header == null || !header.startsWith("Bearer ")) {
            return null;
        }
        String token = header.substring(7);
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public static List<String> getRolesFromAuthorizationHeader(String header) {
        if (header == null || !header.startsWith("Bearer ")) {
            return null;
        }
        String token = header.substring(7);
        return (List<String>)Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .get("authorities");
    }
}
