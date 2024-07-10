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
        return new ResponseEntity<>(BaseResponse.from(READ_ONGOING_INTERVIEW_SUCCESS_MESSAGE, interviewService.readOngoingInterview(principalDetails.getUser(), interviewId)), HttpStatus.OK);
    }

    @DeleteMapping("/{interviewId}")
    public ResponseEntity<BaseResponse> endInterview(@AuthenticationPrincipal final PrincipalDetails principalDetails,
                                                     @PathVariable final Long interviewId) {
        interviewService.endInterview(principalDetails.getUser(), interviewId);
        return new ResponseEntity<>(BaseResponse.from(END_INTERVIEW_MESSAGE), HttpStatus.OK);
    }

    @GetMapping("/records")
    public ResponseEntity<BaseResponse> readInterviewList(@AuthenticationPrincipal final PrincipalDetails principalDetails,
                                                          @RequestParam(defaultValue = "0") final long last) {
        return new ResponseEntity<>(BaseResponse.from(READ_INTERVIEW_RECORD_LIST_SUCCESS_MESSAGE, interviewService.readInterviewList(principalDetails.getUser(), last)), HttpStatus.OK);
    }

    @DeleteMapping("/records/{interviewId}")
    public ResponseEntity<BaseResponse> removeInterview(@AuthenticationPrincipal final PrincipalDetails principalDetails,
                                                        @PathVariable final Long interviewId) {
        interviewService.removeInterview(principalDetails.getUser(), interviewId);
        return new ResponseEntity<>(BaseResponse.from(REMOVE_INTERVIEW_SUCCESS_MESSAGE), HttpStatus.OK);
    }
}
