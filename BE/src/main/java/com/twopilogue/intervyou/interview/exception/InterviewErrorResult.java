package com.twopilogue.intervyou.interview.exception;

import com.twopilogue.intervyou.common.BaseErrorResult;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum InterviewErrorResult implements BaseErrorResult {

    ALREADY_ONGOING_INTERVIEW(HttpStatus.BAD_REQUEST, "이미 진행중인 면접이 있습니다."),
    NO_ONGOING_INTERVIEW(HttpStatus.BAD_REQUEST, "진행중인 면접이 없습니다."),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "올바른 요청값이 아닙니다."),
    INVALID_INTERVIEW_ID(HttpStatus.BAD_REQUEST, "유효한 면접 ID가 아닙니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
