package com.twopilogue.intervyou.community.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentResponse {
    private Boolean isDelete;
    private Long commentId;
    private String nickname;
    private String commentContent;
    private String createTime;
    private Long parentCommentId;
    private int depth;
}