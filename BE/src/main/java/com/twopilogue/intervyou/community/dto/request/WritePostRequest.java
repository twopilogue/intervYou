package com.twopilogue.intervyou.community.dto.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class WritePostRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String content;
}
