package com.twopilogue.intervyou.user.service;

import com.twopilogue.intervyou.user.dto.response.LoginResponse;
import com.twopilogue.intervyou.user.dto.response.naver.NaverIdTokenResponse;
import com.twopilogue.intervyou.user.dto.response.naver.NaverTokenResponse;
import com.twopilogue.intervyou.user.entity.User;
import com.twopilogue.intervyou.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Value("${naver.key.cliend-id}")
    private String naverClientID;

    @Value("${naver.key.cliend-secret}")
    private String naverClientSecret;

    public LoginResponse login(final String code) {
        final String naverAccessToken = getNaverAccessToken(code);
        final String naverIdToken = getNaverIdToken(naverAccessToken);
        User user = userRepository.findByNaverIdToken(naverIdToken);

        if (user == null) {
            user = userRepository.save(User.builder()
                    .naverIdToken(naverIdToken)
                    .build());
        }

        return LoginResponse.builder().id(user.getUserId()).build();
    }

    private String getNaverAccessToken(final String code) {
        final NaverTokenResponse naverTokenResponse = WebClient.create("https://nid.naver.com").get()
                .uri(uriBuilder -> uriBuilder.path("/oauth2.0/token")
                        .queryParam("grant_type", "authorization_code")
                        .queryParam("client_id", naverClientID)
                        .queryParam("client_secret", naverClientSecret)
                        .queryParam("code", code)
                        .queryParam("state", "intervYou")
                        .build())
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError()
                        , clientResponse -> clientResponse.bodyToMono(String.class).map(body -> new RuntimeException(body)))
                .bodyToMono(NaverTokenResponse.class)
                .block();
        return naverTokenResponse.getAccessToken();
    }

    private String getNaverIdToken(final String naverAccessToken) {
        final NaverIdTokenResponse naverIdTokenResponse = WebClient.create("https://openapi.naver.com").get()
                .uri("/v1/nid/me")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + naverAccessToken)
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError()
                        , clientResponse -> clientResponse.bodyToMono(String.class).map(body -> new RuntimeException(body)))
                .bodyToMono(NaverIdTokenResponse.class)
                .block();
        return naverIdTokenResponse.getNaverIdToken();
    }
}
