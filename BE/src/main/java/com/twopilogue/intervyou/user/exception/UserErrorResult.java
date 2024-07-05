package com.twopilogue.intervyou.user.exception;

import com.twopilogue.intervyou.common.dto.BaseErrorResult;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum UserErrorResult implements BaseErrorResult {

    UNREGISTERED_USER(HttpStatus.FORBIDDEN, "등록되지 않은 사용자입니다."),
    EXPIRED_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, "액세스 토큰이 만료되었습니다."),
    FAIL_VALIDATE_TOKEN(HttpStatus.FORBIDDEN, "토큰 인증에 실패했습니다."),
    NOT_FOUND_USER(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
