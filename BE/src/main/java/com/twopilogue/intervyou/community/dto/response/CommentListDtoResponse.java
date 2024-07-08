package com.twopilogue.intervyou.community.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentListDtoResponse {
    private long commentId;
    private long communityId;
    private String title;
    private String commentContent;
    private String createTime;
}
