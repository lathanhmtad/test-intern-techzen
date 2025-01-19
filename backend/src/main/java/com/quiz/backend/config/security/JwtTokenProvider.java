package com.quiz.backend.config.security;

import com.quiz.backend.util.TimeConverterUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

import java.security.Key;
import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {
    @Value("${jwt.jwtSecret}")
    private String jwtSecret;

    @Value("${jwt.jwtExpiration}")
    private String jwtExpiration;

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.error(e.getMessage());
        }
        return false;
    }

    public String generateJwtToken(Authentication authentication) {
        Date currentDate = new Date();
        long jwtExpirationMs = TimeConverterUtil.getMilliseconds(jwtExpiration);

        Date expireDate = new Date(currentDate.getTime() + jwtExpirationMs);

        MyUserDetails user = (MyUserDetails) authentication.getPrincipal();

        return Jwts.builder()
                .setIssuer("quiz-backend")
                .setSubject(user.getName())
                .claim("participantId", user.getId())
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(key())
                .compact();
    }

    public Authentication getAuthenticationFromToken(String token) {
        Claims claims = this.parseJwtToken(token);
        Long participantId = Long.parseLong(claims.get("participantId").toString());
        return new UsernamePasswordAuthenticationToken(participantId, null, null);
    }

    private Claims parseJwtToken(String authToken) {
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(authToken)
                .getBody();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(
                Decoders.BASE64.decode(jwtSecret)
        );
    }
}