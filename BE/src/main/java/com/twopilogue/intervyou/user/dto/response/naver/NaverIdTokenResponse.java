package com.twopilogue.intervyou.user.dto.response.naver;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class NaverIdTokenResponse {

    private String naverIdToken;

    @SuppressWarnings("unchecked")
    @JsonProperty("response")
    private void unpackNested(Map<String,Object> response) {
        this.naverIdToken = (String)response.get("id");
    }
}
