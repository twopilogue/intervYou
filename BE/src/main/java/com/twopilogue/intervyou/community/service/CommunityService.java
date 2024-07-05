package com.twopilogue.intervyou.community.service;

import com.twopilogue.intervyou.community.dto.request.WritePostRequest;
import com.twopilogue.intervyou.community.dto.response.WritePostResponse;
import com.twopilogue.intervyou.community.entity.Community;
import com.twopilogue.intervyou.community.repositiry.CommunityRepository;
import com.twopilogue.intervyou.user.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;

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

}
