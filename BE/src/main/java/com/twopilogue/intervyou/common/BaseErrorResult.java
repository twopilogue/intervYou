package com.twopilogue.intervyou.common.dto;

import org.springframework.http.HttpStatus;

public interface BaseErrorResult {
    HttpStatus getHttpStatus();
    String getMessage();
    String name();
}
