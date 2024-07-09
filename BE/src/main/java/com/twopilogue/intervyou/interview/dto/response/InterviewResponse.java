package com.twopilogue.intervyou.interview.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InterviewResponse {
    private int sequence;
    private String content;
    private String createTime;
}
