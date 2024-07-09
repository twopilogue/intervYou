package com.twopilogue.intervyou.interview.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StartInterviewResponse {
    private long interviewId;
    private InterviewContentResponse question;
}
