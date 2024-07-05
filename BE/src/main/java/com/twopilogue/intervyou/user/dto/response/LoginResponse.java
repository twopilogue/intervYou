package com.twopilogue.intervyou.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponse {
    private String token;
    private String nickname;
    private long id;
}
