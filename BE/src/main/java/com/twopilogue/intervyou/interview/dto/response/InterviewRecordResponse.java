package com.twopilogue.intervyou.interview.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InterviewRecordResponse {
    private long interviewId;
    private String interviewInfo;
    private String createTime;
    private Boolean isActive;
}
