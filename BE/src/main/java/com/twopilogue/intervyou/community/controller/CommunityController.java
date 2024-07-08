package com.twopilogue.intervyou.community.controller;

import com.twopilogue.intervyou.common.BaseResponse;
import com.twopilogue.intervyou.community.dto.request.ModifyCommentRequest;
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

    @GetMapping("/{communityId}")
    public ResponseEntity<BaseResponse> readPost(@PathVariable final long communityId) {
        return new ResponseEntity<>(BaseResponse.from(READ_POST_SUCCESS_MESSAGE, communityService.readPost(communityId)), HttpStatus.OK);
    }

    @PutMapping("/{communityId}")
    public ResponseEntity<BaseResponse> modifyPost(@AuthenticationPrincipal final PrincipalDetails principalDetails,
                                                   @PathVariable final long communityId,
                                                   @RequestBody @Valid final ModifyPostRequest modifyPostRequest) {
        communityService.modifyPost(principalDetails.getUser(), communityId, modifyPostRequest);
        return new ResponseEntity<>(BaseResponse.from(MODIFY_POST_SUCCESS_MESSAGE), HttpStatus.OK);
    }

    @DeleteMapping("/{communityId}")
    public ResponseEntity<BaseResponse> removePost(@AuthenticationPrincipal final PrincipalDetails principalDetails,
                                                   @PathVariable final long communityId) {
        communityService.removePost(principalDetails.getUser(), communityId);
        return new ResponseEntity<>(BaseResponse.from(REMOVE_POST_SUCCESS_MESSAGE), HttpStatus.OK);
    }

    @PostMapping("/{communityId}/comments")
    public ResponseEntity<BaseResponse> writeComment(@AuthenticationPrincipal final PrincipalDetails principalDetails,
                                                     @PathVariable final long communityId,
                                                     @RequestBody @Valid final WriteCommentRequest writeCommentRequest) {
        return new ResponseEntity<>(BaseResponse.from(WRITE_COMMENT_SUCCESS_MESSAGE, communityService.writeComment(principalDetails.getUser(), communityId, writeCommentRequest)), HttpStatus.OK);
    }

    @PutMapping("/{communityId}/comments/{commentId}")
    public ResponseEntity<BaseResponse> modifyComment(@AuthenticationPrincipal final PrincipalDetails principalDetails,
                                                      @PathVariable final long communityId,
                                                      @PathVariable final long commentId,
                                                      @RequestBody @Valid final ModifyCommentRequest modifyCommentRequest) {
        communityService.modifyComment(principalDetails.getUser(), communityId, commentId, modifyCommentRequest);
        return new ResponseEntity<>(BaseResponse.from(MODIFY_COMMENT_SUCCESS_MESSAGE), HttpStatus.OK);
    }

    @DeleteMapping("/{communityId}/comments/{commentId}")
    public ResponseEntity<BaseResponse> removeComment(@AuthenticationPrincipal final PrincipalDetails principalDetails,
                                                      @PathVariable final long communityId,
                                                      @PathVariable final long commentId) {
        communityService.removeComment(principalDetails.getUser(), communityId, commentId);
        return new ResponseEntity<>(BaseResponse.from(REMOVE_COMMENT_SUCCESS_MESSAGE), HttpStatus.OK);
    }
}
