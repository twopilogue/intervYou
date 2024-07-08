package com.twopilogue.intervyou.community.dto.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class WriteCommentRequest {

    private Long parentCommentId;

    @NotBlank
    private String commentContent;

}
