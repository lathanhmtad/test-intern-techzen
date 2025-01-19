package com.quiz.backend.config.security;

import com.quiz.backend.entity.Participant;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
public class MyUserDetails extends User {
    private Long id;
    private String name;
    public MyUserDetails(Long id, String name, String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        this.id = id;
        this.name = name;
    }

    public static MyUserDetails build(Participant participant) {
        String role = participant.getRole().toString();
        List<GrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority(role)
        );
        return new MyUserDetails(
                participant.getId(),
                participant.getName(),
                participant.getUsername(),
                participant.getPassword(),
                participant.getEnabled(),
                true,
                true,
                true,
                authorities
        );
    }
}
