package com.twopilogue.intervyou.community.repositiry;

import com.twopilogue.intervyou.community.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    Community findByIdAndNicknameAndDeleteTimeIsNull(final long id, final String nickname);
    Community findByIdAndDeleteTimeIsNull(final long id);
    boolean existsByIdAndDeleteTimeIsNull(final long id);

    @Modifying(clearAutomatically = true)
    @Query("update Community c set c.deleteTime = :deleteTime where c.id = :communityId")
    void deleteByCommunityId(@Param("communityId") final long communityId, @Param("deleteTime") final LocalDateTime time);

}
