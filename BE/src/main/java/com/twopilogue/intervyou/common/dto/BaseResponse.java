package com.twopilogue.intervyou.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class BaseResponse {
    private String message;
    private Object data;

    public static BaseResponse from(final String message) {
        return builder().message(message).build();
    }

    public static BaseResponse from(final String message, final Object data) {
        return builder().message(message).data(data).build();
    }
}
