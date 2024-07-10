package com.twopilogue.intervyou.interview.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class InterviewRecordListResponse {
    private List<InterviewRecordResponse> records;
}
