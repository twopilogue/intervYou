package com.twopilogue.intervyou.interview.repository;

import com.twopilogue.intervyou.interview.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {
    boolean existsByUserIdAndIsActiveTrue(final long userId);
}
