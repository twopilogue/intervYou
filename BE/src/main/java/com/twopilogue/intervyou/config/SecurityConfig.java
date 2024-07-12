package com.twopilogue.intervyou.config;

import com.twopilogue.intervyou.config.jwt.JwtAuthorizationFilter;
import com.twopilogue.intervyou.config.jwt.JwtExceptionHandler;
import com.twopilogue.intervyou.config.jwt.JwtProvider;
import com.twopilogue.intervyou.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsFilter corsFilter;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final JwtExceptionHandler jwtException;

    private static final String[] PERMIT_ALL_URL_ARRAY = {
            "/api/users/login",
            "/api/communities",
            "/api/communities/**",
            "/socket/notifications/**"
    };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .httpBasic().disable()
                .apply(new CustomFilter())
                .and()
                .exceptionHandling().authenticationEntryPoint(jwtException)
                .and()
                .authorizeRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET, PERMIT_ALL_URL_ARRAY)
                        .permitAll()
                        .anyRequest().authenticated())
        ;

        return http.build();
    }

    public class CustomFilter extends AbstractHttpConfigurer<CustomFilter, HttpSecurity> {

        @Override
        public void configure(HttpSecurity http) throws Exception {
            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
            http.addFilter(corsFilter)
                    .addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository, jwtProvider));
        }
    }
}