package com.twopilogue.intervyou.user.exception;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserException extends RuntimeException {
    private final UserErrorResult errorResult;
}
