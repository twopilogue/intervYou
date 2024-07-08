package com.twopilogue.intervyou.community.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CommunityException extends RuntimeException {
    private final CommunityErrorResult errorResult;
}
