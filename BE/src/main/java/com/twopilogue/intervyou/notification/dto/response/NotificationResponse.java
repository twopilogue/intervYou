package com.twopilogue.intervyou.notification.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class NotificationResponse {
    private Long communityId;
    private String type;
    private String content;
}
