package com.twopilogue.intervyou.community.controller;

import com.twopilogue.intervyou.common.BaseResponse;
import com.twopilogue.intervyou.community.dto.request.ModifyPostRequest;
import com.twopilogue.intervyou.community.dto.request.WriteCommentRequest;
import com.twopilogue.intervyou.community.dto.request.WritePostRequest;
import com.twopilogue.intervyou.community.service.CommunityService;
import com.twopilogue.intervyou.config.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.twopilogue.intervyou.community.constant.CommunityConstant.*;

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

    @PutMapping("/{communityId}")
    public ResponseEntity<BaseResponse> modifyPost(@AuthenticationPrincipal final PrincipalDetails principalDetails,
                                                   @PathVariable final long communityId,
                                                   @RequestBody @Valid final ModifyPostRequest modifyPostRequest) {
        communityService.modifyPost(principalDetails.getUser(), communityId, modifyPostRequest);
        return new ResponseEntity<>(BaseResponse.from(MODIFY_POST_SUCCESS_MESSAGE), HttpStatus.OK);
    }

    @PostMapping("/{communityId}/comments")
    public ResponseEntity<BaseResponse> writeComment(@AuthenticationPrincipal final PrincipalDetails principalDetails,
                                                     @PathVariable final long communityId,
                                                     @RequestBody @Valid final WriteCommentRequest writeCommentRequest) {
        return new ResponseEntity<>(BaseResponse.from(WRITE_COMMENT_SUCCESS_MESSAGE, communityService.writeComment(principalDetails.getUser(), communityId, writeCommentRequest)), HttpStatus.OK);
    }
}
