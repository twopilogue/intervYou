package com.twopilogue.intervyou.community.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WriteCommentResponse {
    private long commentId;
    private long communityId;
    private Long parentCommentId;
    private String commentContent;
    private String nickname;
    private String createTime;
    private int depth;
    private int group;
}