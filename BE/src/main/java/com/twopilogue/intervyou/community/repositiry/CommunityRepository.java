package com.twopilogue.intervyou.community.repositiry;

import com.twopilogue.intervyou.community.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    Community findByIdAndNickname(final long id, final String nickname);
}
