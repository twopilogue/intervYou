package com.twopilogue.intervyou.notification.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class NotificationListDtoResponse {
    private Long notificationId;
    private String type;
    private String notificationContent;
    private Long communityId;
    private String createTime;
    private Boolean isNewNotification;
}
