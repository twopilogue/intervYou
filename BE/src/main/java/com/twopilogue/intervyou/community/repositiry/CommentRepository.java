package com.twopilogue.intervyou.community.repositiry;

import com.twopilogue.intervyou.community.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Comment findByIdAndCommunityIdAndDeleteTimeIsNull(final long id, final long communityId);
    Comment findByIdAndNicknameAndCommunityIdAndDeleteTimeIsNull(final long id, final String nickname, final long communityId);
    List<Comment> findAllByCommunityIdAndParentCommentIdOrderByCreateTime(final long communityId, final Long parentCommentId);
    int countByCommunityIdAndDepth(final long communityId, final int depth);

    @Modifying(clearAutomatically = true)
    @Query("update Comment c set c.deleteTime = :deleteTime where c.communityId = :communityId and c.deleteTime is null")
    void deleteAllByCommunityId(@Param("communityId") final long communityId, @Param("deleteTime") final LocalDateTime time);
}
