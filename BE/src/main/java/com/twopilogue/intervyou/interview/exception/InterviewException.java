package com.twopilogue.intervyou.interview.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class InterviewException extends RuntimeException {
    private final InterviewErrorResult errorResult;
}
