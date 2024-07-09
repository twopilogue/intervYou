package com.twopilogue.intervyou.interview.controller;

import com.twopilogue.intervyou.common.BaseResponse;
import com.twopilogue.intervyou.config.auth.PrincipalDetails;
import com.twopilogue.intervyou.interview.dto.request.StartInterviewRequest;
import com.twopilogue.intervyou.interview.dto.response.CheckOngoingInterviewResponse;
import com.twopilogue.intervyou.interview.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.twopilogue.intervyou.interview.constant.InterviewConstant.*;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/interviews")
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping("")
    public ResponseEntity<BaseResponse> startInterview(@AuthenticationPrincipal final PrincipalDetails principalDetails,
                                                       @Valid @RequestBody StartInterviewRequest startInterviewRequest) {
        return new ResponseEntity<>(BaseResponse.from(START_INTERVIEW_MESSAGE, interviewService.startInterview(principalDetails.getUser(), startInterviewRequest)), HttpStatus.OK);

    }

    @GetMapping("")
    public ResponseEntity<BaseResponse> checkOngoingInterview(@AuthenticationPrincipal final PrincipalDetails principalDetails) {
        final CheckOngoingInterviewResponse checkOngoingInterviewResponse = interviewService.checkOngoingInterview(principalDetails.getUser());
        if (checkOngoingInterviewResponse == null) {
            return new ResponseEntity<>(BaseResponse.from(NO_ONGOING_INTERVIEW_MESSAGE), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(BaseResponse.from(ONGOING_INTERVIEW_MESSAGE, checkOngoingInterviewResponse), HttpStatus.OK);
        }
    }

    @GetMapping("/{interviewId}")
    public ResponseEntity<BaseResponse> readOngoingInterview(@AuthenticationPrincipal final PrincipalDetails principalDetails,
                                                             @PathVariable final Long interviewId) {
        return new ResponseEntity<>(BaseResponse.from(READ_ONGOING_INTERVIEW_RECORD_SUCCESS_MESSAGE, interviewService.readOngoingInterview(principalDetails.getUser(), interviewId)), HttpStatus.OK);
    }
}
