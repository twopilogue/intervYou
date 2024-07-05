package com.twopilogue.intervyou.community.controller;

import com.twopilogue.intervyou.common.dto.BaseResponse;
import com.twopilogue.intervyou.community.dto.request.WritePostRequest;
import com.twopilogue.intervyou.community.service.CommunityService;
import com.twopilogue.intervyou.config.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.twopilogue.intervyou.community.constant.CommunityConstant.WRITE_POST_SUCCESS_MESSAGE;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/communities")
public class CommunityController {

    private final CommunityService communityService;

    @PostMapping
    public ResponseEntity<BaseResponse> writePost(@AuthenticationPrincipal final PrincipalDetails principalDetails,
                                                  @RequestBody @Valid final WritePostRequest writePostRequest) {
        return new ResponseEntity<>(BaseResponse.from(WRITE_POST_SUCCESS_MESSAGE, communityService.writePost(principalDetails.getUser(), writePostRequest)), HttpStatus.OK);
    }
}
