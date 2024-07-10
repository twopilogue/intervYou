package com.twopilogue.intervyou.interview.repository;

import com.twopilogue.intervyou.interview.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {
    boolean existsByUserIdAndIsActiveTrue(final long userId);
    Interview findByUserIdAndIsActiveTrue(final long userId);
    Interview findByIdAndUserId(final long interviewId, final long userId);
    List<Interview> findTop10ByUserIdOrderByIdDesc(final long userId);
    List<Interview> findTop10ByUserIdAndIdLessThanOrderByIdDesc(final long userId, final long interviewId);
}
