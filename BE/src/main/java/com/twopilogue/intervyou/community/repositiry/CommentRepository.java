package com.twopilogue.intervyou.community.repositiry;

import com.twopilogue.intervyou.community.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Comment findByIdAndCommunityIdAndDeleteTimeIsNull(final long id, final long communityId);
    Comment findByIdAndNicknameAndCommunityIdAndDeleteTimeIsNull(final long id, final String nickname, final long communityId);
    int countByCommunityIdAndDepth(final long communityId, final int depth);
}
