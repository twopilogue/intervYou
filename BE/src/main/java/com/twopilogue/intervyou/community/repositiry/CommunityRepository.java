package com.twopilogue.intervyou.community.repositiry;

import com.twopilogue.intervyou.community.entity.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    Community findByIdAndNicknameAndDeleteTimeIsNull(final long id, final String nickname);
    boolean existsByIdAndDeleteTimeIsNull(final long id);
    Page<Community> findAllByDeleteTimeIsNull(final Pageable pageable);
    Page<Community> findAllByNicknameAndDeleteTimeIsNull(final Pageable pageable, final String nickname);

    @Query("select c from Community c where Function('replace', c.title, ' ', '') like %:title% and c.deleteTime is null ")
    Page<Community> findAllByTitle(final Pageable pageable, @Param("title") final String title);

    @Modifying(clearAutomatically = true)
    @Query("update Community c set c.deleteTime = :deleteTime where c.id = :communityId")
    void deleteByCommunityId(@Param("communityId") final long communityId, @Param("deleteTime") final LocalDateTime time);

}
