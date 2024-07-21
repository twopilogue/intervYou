package com.twopilogue.intervyou.notification.repository;

import com.twopilogue.intervyou.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByNicknameOrderByCreateTimeDesc(final String nickname);
}
