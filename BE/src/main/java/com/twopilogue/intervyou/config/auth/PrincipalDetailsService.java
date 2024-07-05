package com.twopilogue.intervyou.config.auth;

import com.twopilogue.intervyou.user.entity.User;
import com.twopilogue.intervyou.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String naverIdToken) throws UsernameNotFoundException {
        User userEntity = userRepository.findByNaverIdToken(naverIdToken);
        return new PrincipalDetails(userEntity);
    }
}
