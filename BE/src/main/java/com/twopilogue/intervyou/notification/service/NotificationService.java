package com.twopilogue.intervyou.notification.service;

import com.twopilogue.intervyou.community.entity.Community;
import com.twopilogue.intervyou.notification.dto.response.NotificationListDtoResponse;
import com.twopilogue.intervyou.notification.dto.response.NotificationListResponse;
import com.twopilogue.intervyou.notification.dto.response.NotificationResponse;
import com.twopilogue.intervyou.notification.entity.Notification;
import com.twopilogue.intervyou.notification.repository.NotificationRepository;
import com.twopilogue.intervyou.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final WebSocketService webSocketService;

    private String localDateTimeToString(final LocalDateTime time) {
        final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return time.format(formatter);
    }

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

    public NotificationListResponse readNotificationList(final User user) {
        final List<Notification> notifications = notificationRepository.findAllByNicknameOrderByCreateTimeDesc(user.getNickname());
        return NotificationListResponse.builder()
                .notifications(notifications.stream().map(
                        notification -> NotificationListDtoResponse.builder()
                                .notificationId(notification.getId())
                                .type(notification.getType())
                                .notificationContent(notification.getNotificationContent())
                                .communityId(notification.getCommunityId())
                                .createTime(localDateTimeToString(notification.getCreateTime()))
                                .isNewNotification(notification.getIsNewNotification())
                                .build()
                ).collect(Collectors.toList()))
                .build();
    }
}