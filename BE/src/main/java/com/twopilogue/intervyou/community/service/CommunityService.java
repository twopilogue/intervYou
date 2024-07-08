package com.twopilogue.intervyou.community.service;

import com.twopilogue.intervyou.community.dto.request.ModifyCommentRequest;
import com.twopilogue.intervyou.community.dto.request.ModifyPostRequest;
import com.twopilogue.intervyou.community.dto.request.WriteCommentRequest;
import com.twopilogue.intervyou.community.dto.request.WritePostRequest;
import com.twopilogue.intervyou.community.dto.response.CommentResponse;
import com.twopilogue.intervyou.community.dto.response.PostListDtoResponse;
import com.twopilogue.intervyou.community.dto.response.PostListResponse;
import com.twopilogue.intervyou.community.dto.response.PostResponse;
import com.twopilogue.intervyou.community.entity.Comment;
import com.twopilogue.intervyou.community.entity.Community;
import com.twopilogue.intervyou.community.exception.CommunityErrorResult;
import com.twopilogue.intervyou.community.exception.CommunityException;
import com.twopilogue.intervyou.community.repositiry.CommentRepository;
import com.twopilogue.intervyou.community.repositiry.CommunityRepository;
import com.twopilogue.intervyou.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        if (!communityRepository.existsByIdAndDeleteTimeIsNull(communityId)) {
            throw new CommunityException(CommunityErrorResult.INVALID_POST);
        }
    }

    private Community findCommunity(final String nickname, final long communityId) {
        final Community community = communityRepository.findByIdAndNicknameAndDeleteTimeIsNull(communityId, nickname);
        if (community == null) {
            throw new CommunityException(CommunityErrorResult.INVALID_POST);
        }
        return community;
    }

    private Comment findComment(final String nickname, final long commentId, final long communityId) {
        final Comment comment = commentRepository.findByIdAndNicknameAndCommunityIdAndDeleteTimeIsNull(commentId, nickname, communityId);
        if (comment == null) {
            throw new CommunityException(CommunityErrorResult.INVALID_COMMENT);
        }
        return comment;
    }

    private List<Comment> findComments(final long communityId, final Long parentCommentId) {
        final List<Comment> comments = new ArrayList<>();
        final List<Comment> commentList = commentRepository.findAllByCommunityIdAndParentCommentIdOrderByCreateTime(communityId, parentCommentId);
        for (Comment comment : commentList) {
            comments.add(comment);
            comments.addAll(findComments(communityId, comment.getId()));
        }
        return comments;
    }

    public PostListResponse readPostList(int page, String keyword) {
        final PageRequest pageRequest = PageRequest.of(page <= 0 ? 0 : page - 1, 10, Sort.by(Sort.Direction.DESC, "id"));
        keyword = keyword.replaceAll(" ", "");

        Page<Community> postList;
        if (keyword.equals("")) {
            postList = communityRepository.findAllByDeleteTimeIsNull(pageRequest);
        } else {
            postList = communityRepository.findAllByTitle(pageRequest, keyword);
        }

        return PostListResponse.builder()
                .totalPages(postList.getTotalPages())
                .communities(postList.map(post -> PostListDtoResponse.builder()
                                .communityId(post.getId())
                                .title(post.getTitle())
                                .content(post.getContent())
                                .nickname(post.getNickname())
                                .createTime(localDateTimeToString(post.getCreateTime()))
                                .commentCount(commentRepository.countByCommunityId(post.getId()))
                                .build())
                        .toList())
                .build();
    }

    public PostResponse writePost(final User user, final WritePostRequest writePostRequest) {
        final Community community = communityRepository.save(Community.builder()
                .title(writePostRequest.getTitle())
                .content(writePostRequest.getContent())
                .nickname(user.getNickname())
                .build());

        return PostResponse.builder()
                .communityId(community.getId())
                .title(community.getTitle())
                .content(community.getContent())
                .nickname(community.getNickname())
                .createTime(localDateTimeToString(community.getCreateTime()))
                .commentCount(0)
                .comments(new ArrayList<>())
                .build();
    }

    public PostResponse readPost(final long communityId) {
        final Optional<Community> community_opt = communityRepository.findById(communityId);
        if (!community_opt.isPresent()) {
            throw new CommunityException(CommunityErrorResult.INVALID_POST);
        }

        final Community community = community_opt.get();
        if (community.getDeleteTime() != null) {
            throw new CommunityException(CommunityErrorResult.REMOVED_POST);
        }

        final List<Comment> comments = findComments(communityId, null);
        return PostResponse.builder()
                .communityId(community.getId())
                .title(community.getTitle())
                .content(community.getContent())
                .nickname(community.getNickname())
                .createTime(localDateTimeToString(community.getCreateTime()))
                .commentCount(comments.size())
                .comments(comments.stream()
                        .map(comment -> CommentResponse.builder()
                                .isDelete(comment.getDeleteTime() != null)
                                .commentId(comment.getDeleteTime() == null ? comment.getId() : null)
                                .nickname(comment.getDeleteTime() == null ? comment.getNickname() : null)
                                .commentContent(comment.getDeleteTime() == null ? comment.getCommentContent() : null)
                                .createTime(comment.getDeleteTime() == null ? localDateTimeToString(comment.getCreateTime()) : null)
                                .parentCommentId(comment.getDeleteTime() == null ? comment.getParentCommentId() : null)
                                .depth(comment.getDepth())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    public void modifyPost(final User user, final long communityId, final ModifyPostRequest modifyPostRequest) {
        final Community community = findCommunity(user.getNickname(), communityId);
        community.modifyPost(modifyPostRequest.getTitle(), modifyPostRequest.getContent());
    }

    public void removePost(final User user, final long communityId) {
        findCommunity(user.getNickname(), communityId);
        final LocalDateTime deleteTime = LocalDateTime.now();
        commentRepository.deleteAllByCommunityId(communityId, deleteTime);
        communityRepository.deleteByCommunityId(communityId, deleteTime);
    }

    public CommentResponse writeComment(final User user, final long communityId, final WriteCommentRequest writeCommentRequest) {
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

        return CommentResponse.builder()
                .isDelete(false)
                .commentId(comment.getId())
                .parentCommentId(comment.getParentCommentId())
                .commentContent(comment.getCommentContent())
                .nickname(comment.getNickname())
                .depth(comment.getDepth())
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

    public PostListResponse readMyPostList(final User user, int page) {
        final PageRequest pageRequest = PageRequest.of(page <= 0 ? 0 : page - 1, 10, Sort.by(Sort.Direction.DESC, "id"));
        final Page<Community> postList = communityRepository.findAllByNicknameAndDeleteTimeIsNull(pageRequest, user.getNickname());

        return PostListResponse.builder()
                .totalPages(postList.getTotalPages())
                .communities(postList.map(post -> PostListDtoResponse.builder()
                                .communityId(post.getId())
                                .title(post.getTitle())
                                .content(post.getContent())
                                .nickname(post.getNickname())
                                .createTime(localDateTimeToString(post.getCreateTime()))
                                .commentCount(commentRepository.countByCommunityId(post.getId()))
                                .build())
                        .toList())
                .build();
    }
}
