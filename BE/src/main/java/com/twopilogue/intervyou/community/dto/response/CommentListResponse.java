package com.twopilogue.intervyou.community.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CommentListResponse {
    private int totalPages;
    private List<CommentListDtoResponse> comments;
}
