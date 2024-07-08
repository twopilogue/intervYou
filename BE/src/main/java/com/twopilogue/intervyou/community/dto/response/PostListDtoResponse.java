package com.twopilogue.intervyou.community.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostListDtoResponse {
    private long communityId;
    private String title;
    private String content;
    private String nickname;
    private String createTime;
    private int commentCount;
}
