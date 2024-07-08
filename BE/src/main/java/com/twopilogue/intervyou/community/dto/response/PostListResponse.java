package com.twopilogue.intervyou.community.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PostListResponse {
    private int totalPages;
    private List<PostListDtoResponse> communities;
}
