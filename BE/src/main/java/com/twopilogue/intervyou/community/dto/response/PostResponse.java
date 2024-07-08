package com.twopilogue.intervyou.community.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PostResponse {
    private long communityId;
    private String title;
    private String content;
    private String nickname;
    private String createTime;
    private int commentCount;
    private List<CommentResponse> comments;
}
