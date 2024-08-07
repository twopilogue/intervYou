package com.twopilogue.intervyou.community.exception;

import com.twopilogue.intervyou.common.BaseErrorResult;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommunityErrorResult implements BaseErrorResult {

    INVALID_POST(HttpStatus.BAD_REQUEST, "유효하지 않은 게시글입니다."),
    INVALID_COMMENT(HttpStatus.BAD_REQUEST, "유효하지 않은 댓글입니다."),
    REMOVED_POST(HttpStatus.BAD_REQUEST, "삭제된 게시글입니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
