package com.twopilogue.intervyou.user.repository;

import com.twopilogue.intervyou.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByNaverIdTokenAndWithdrawalTimeIsNull(final String naverIdToken);
}
