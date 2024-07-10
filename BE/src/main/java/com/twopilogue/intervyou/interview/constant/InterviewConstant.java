package com.twopilogue.intervyou.interview.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class InterviewConstant {
    public static final String START_INTERVIEW_MESSAGE = "면접이 시작되었습니다.";
    public static final String END_INTERVIEW_MESSAGE = "면접이 종료되었습니다.";
    public static final String ONGOING_INTERVIEW_MESSAGE = "진행중인 면접이 있습니다.";
    public static final String NO_ONGOING_INTERVIEW_MESSAGE = "진행중인 면접이 없습니다.";
    public static final String READ_ONGOING_INTERVIEW_SUCCESS_MESSAGE = "진행중인 면접 조회를 완료했습니다.";
    public static final String REMOVE_INTERVIEW_SUCCESS_MESSAGE = "면접 기록 삭제가 완료되었습니다.";
}
