package com.twopilogue.intervyou.interview.dto.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Builder
public class StartInterviewRequest {

    @NotBlank
    String job;

    String questionType;
    int questionCount;
    int InterviewType;
    List<String> questionList;
}
