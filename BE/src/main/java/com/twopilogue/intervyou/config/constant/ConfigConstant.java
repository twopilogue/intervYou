package com.twopilogue.intervyou.config.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ConfigConstant {
    public static final String KEY_ID = "id";
    public static final String KEY_NAVER_ID_TOKEN = "naverIdToken";
    public static final String KEY_EXCEPTION = "Exception";

    public static final String SUBJECT = "IntervYou JWT";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
}
