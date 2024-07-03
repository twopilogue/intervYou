package com.twopilogue.intervyou.user.dto.response.naver;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class NaverTokenResponse {
    @JsonProperty("access_token")
    private String accessToken;
}
