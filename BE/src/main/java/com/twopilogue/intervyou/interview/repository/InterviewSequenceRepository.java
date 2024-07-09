package com.twopilogue.intervyou.interview.repository;

import com.twopilogue.intervyou.interview.entity.InterviewSequence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewSequenceRepository extends JpaRepository<InterviewSequence, Long> {
    List<InterviewSequence> findAllByInterviewIdOrderBySequence(final long interviewId);
}
