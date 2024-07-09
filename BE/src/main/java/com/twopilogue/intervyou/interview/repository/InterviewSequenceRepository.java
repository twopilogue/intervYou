package com.twopilogue.intervyou.interview.repository;

import com.twopilogue.intervyou.interview.entity.InterviewSequence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewSequenceRepository extends JpaRepository<InterviewSequence, Long> {
}
