package com.twopilogue.intervyou.interview.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class InterviewResponse {
    private long interviewId;
    private String createTime;
    private List<InterviewContentResponse> interviews;
}
