package com.twopilogue.intervyou.community.service;

import com.twopilogue.intervyou.community.dto.request.ModifyPostRequest;
import com.twopilogue.intervyou.community.dto.request.WritePostRequest;
import com.twopilogue.intervyou.community.dto.response.WritePostResponse;
import com.twopilogue.intervyou.community.entity.Community;
import com.twopilogue.intervyou.community.exception.CommunityErrorResult;
import com.twopilogue.intervyou.community.exception.CommunityException;
import com.twopilogue.intervyou.community.repositiry.CommunityRepository;
import com.twopilogue.intervyou.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;

    @Transactional
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

    @Transactional
    public void modifyPost(final User user, final long communityId, final ModifyPostRequest modifyPostRequest) {
        final Community community = communityRepository.findByIdAndNicknameAndDeleteTimeIsNull(communityId, user.getNickname());
        if (community == null) {
            throw new CommunityException(CommunityErrorResult.INVALID_POST);
        }
        community.modifyPost(modifyPostRequest.getTitle(), modifyPostRequest.getContent());
    }

}
