package com.twopilogue.intervyou.notification.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class NotificationListResponse {
    private List<NotificationListDtoResponse> notifications;
}
