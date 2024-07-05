package com.twopilogue.intervyou.config.jwt;

import com.twopilogue.intervyou.config.auth.PrincipalDetails;
import com.twopilogue.intervyou.user.entity.User;
import com.twopilogue.intervyou.user.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.twopilogue.intervyou.config.constant.ConfigConstant.HEADER_STRING;
import static com.twopilogue.intervyou.config.constant.ConfigConstant.TOKEN_PREFIX;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private UserRepository userRepository;
    private JwtProvider jwtProvider;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository, JwtProvider jwtProvider) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String jwtHeader = request.getHeader(HEADER_STRING);
        if (jwtHeader == null || !jwtHeader.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        if (!jwtProvider.validateHeader(request)) {
            chain.doFilter(request, response);
            return;
        }
        String naverIdToken = jwtProvider.validateToken(request);
        if (naverIdToken != null) {
            User userEntity = userRepository.findByNaverIdToken(naverIdToken);
            PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            chain.doFilter(request, response);
        }
    }
}
