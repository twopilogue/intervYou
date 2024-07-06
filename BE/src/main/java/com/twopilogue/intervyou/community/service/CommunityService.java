package com.twopilogue.intervyou.community.service;

import com.twopilogue.intervyou.community.dto.request.ModifyCommentRequest;
import com.twopilogue.intervyou.community.dto.request.ModifyPostRequest;
import com.twopilogue.intervyou.community.dto.request.WriteCommentRequest;
import com.twopilogue.intervyou.community.dto.request.WritePostRequest;
import com.twopilogue.intervyou.community.dto.response.WriteCommentResponse;
import com.twopilogue.intervyou.community.dto.response.WritePostResponse;
import com.twopilogue.intervyou.community.entity.Comment;
import com.twopilogue.intervyou.community.entity.Community;
import com.twopilogue.intervyou.community.exception.CommunityErrorResult;
import com.twopilogue.intervyou.community.exception.CommunityException;
import com.twopilogue.intervyou.community.repositiry.CommentRepository;
import com.twopilogue.intervyou.community.repositiry.CommunityRepository;
import com.twopilogue.intervyou.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Transactional
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final CommentRepository commentRepository;

    private String localDateTimeToString(final LocalDateTime time) {
        final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return time.format(formatter);
    }

    private void existValidCommunity(final long communityId) {
        final Community community = communityRepository.findByIdAndDeleteTimeIsNull(communityId);
        if (community == null) {
            throw new CommunityException(CommunityErrorResult.INVALID_POST);
        }
    }

    private Comment findComment(final String nickname, final long commentId, final long communityId) {
        final Comment comment = commentRepository.findByIdAndNicknameAndCommunityIdAndDeleteTimeIsNull(commentId, nickname, communityId);
        if (comment == null) {
            throw new CommunityException(CommunityErrorResult.INVALID_COMMENT);
        }
        return comment;
    }

    public WritePostResponse writePost(final User user, final WritePostRequest writePostRequest) {
        final Community community = communityRepository.save(Community.builder()
                .title(writePostRequest.getTitle())
                .content(writePostRequest.getContent())
                .nickname(user.getNickname())
                .build());

        return WritePostResponse.builder()
                .communityId(community.getId())
                .build();

    }

    public void modifyPost(final User user, final long communityId, final ModifyPostRequest modifyPostRequest) {
        final Community community = communityRepository.findByIdAndNicknameAndDeleteTimeIsNull(communityId, user.getNickname());
        if (community == null) {
            throw new CommunityException(CommunityErrorResult.INVALID_POST);
        }
        community.modifyPost(modifyPostRequest.getTitle(), modifyPostRequest.getContent());
    }

    public WriteCommentResponse writeComment(final User user, final long communityId, final WriteCommentRequest writeCommentRequest) {
        existValidCommunity(communityId);
        int depth, commentGroup;
        if (writeCommentRequest.getParentCommentId() != null) {
            final Comment parentComment = commentRepository.findByIdAndCommunityIdAndDeleteTimeIsNull(writeCommentRequest.getParentCommentId(), communityId);
            if (parentComment == null) {
                throw new CommunityException(CommunityErrorResult.INVALID_COMMENT);
            }
            depth = parentComment.getDepth() + 1;
            commentGroup = parentComment.getCommentGroup();
        } else {
            depth = 0;
            commentGroup = commentRepository.countByCommunityIdAndDepth(communityId, 0);
        }

        final Comment comment = commentRepository.save(Comment.builder()
                .communityId(communityId)
                .parentCommentId(writeCommentRequest.getParentCommentId())
                .commentContent(writeCommentRequest.getCommentContent())
                .nickname(user.getNickname())
                .depth(depth)
                .commentGroup(commentGroup)
                .build());

        return WriteCommentResponse.builder()
                .commentId(comment.getId())
                .communityId(comment.getCommunityId())
                .parentCommentId(comment.getParentCommentId())
                .commentContent(comment.getCommentContent())
                .nickname(comment.getNickname())
                .depth(comment.getDepth())
                .commentGroup(comment.getCommentGroup())
                .createTime(localDateTimeToString(comment.getCreateTime()))
                .build();
    }

    public void modifyComment(final User user, final long communityId, final long commentId, final ModifyCommentRequest modifyCommentRequest) {
        existValidCommunity(communityId);
        final Comment comment = findComment(user.getNickname(), commentId, communityId);
        comment.modifyComment(modifyCommentRequest.getCommentContent());
    }

    public void removeComment(final User user, final long communityId, final long commentId) {
        existValidCommunity(communityId);
        final Comment comment = findComment(user.getNickname(), commentId, communityId);
        comment.removeComment();
    }

}
