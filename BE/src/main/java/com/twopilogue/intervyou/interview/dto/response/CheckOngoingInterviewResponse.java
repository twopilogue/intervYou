package com.twopilogue.intervyou.interview.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CheckOngoingInterviewResponse {
    private long interviewId;
}
