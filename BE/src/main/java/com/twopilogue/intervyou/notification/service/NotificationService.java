package com.twopilogue.intervyou.notification.service;

import com.twopilogue.intervyou.community.entity.Community;
import com.twopilogue.intervyou.notification.dto.response.NotificationResponse;
import com.twopilogue.intervyou.notification.entity.Notification;
import com.twopilogue.intervyou.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final WebSocketService webSocketService;

    public void sendNewNotification(final Community community, final Set<String> nicknames) {
        final String message = "[" + community.getTitle() + "]에 댓글이 달렸습니다.";
        final List<Notification> notifications = new ArrayList<>();
        notifications.add(notificationRepository.save(Notification.builder()
                .notificationContent(message)
                .type("내가 작성한 게시글")
                .isNewNotification(true)
                .communityId(community.getId())
                .nickname(community.getNickname())
                .build()));

        for (String nickname : nicknames) {
            notifications.add(notificationRepository.save(Notification.builder()
                    .notificationContent(message)
                    .type("내가 작성한 댓글")
                    .isNewNotification(true)
                    .communityId(community.getId())
                    .nickname(nickname)
                    .build()));
        }

        for (Notification notification : notifications) {
            try {
                webSocketService.sendNewNotification(notification.getNickname(), NotificationResponse.builder()
                        .communityId(notification.getCommunityId())
                        .content(message)
                        .type(notification.getType())
                        .build());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
