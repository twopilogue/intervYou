package com.twopilogue.intervyou.interview.controller;

import com.twopilogue.intervyou.common.BaseResponse;
import com.twopilogue.intervyou.config.auth.PrincipalDetails;
import com.twopilogue.intervyou.interview.dto.request.StartInterviewRequest;
import com.twopilogue.intervyou.interview.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.twopilogue.intervyou.interview.constant.InterviewConstant.START_INTERVIEW_SUCCESS_MESSAGE;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/interview")
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping("")
    public ResponseEntity<BaseResponse> startInterview(@AuthenticationPrincipal final PrincipalDetails principalDetails,
                                                       @Valid @RequestBody StartInterviewRequest startInterviewRequest) {
        return new ResponseEntity<>(BaseResponse.from(START_INTERVIEW_SUCCESS_MESSAGE, interviewService.startInterview(principalDetails.getUser(), startInterviewRequest)), HttpStatus.OK);

    }
}
