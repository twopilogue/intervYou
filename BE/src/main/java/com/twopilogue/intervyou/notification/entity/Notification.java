package com.twopilogue.intervyou.notification.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String notificationContent;

    @Column(nullable = false, length = 10)
    private String type;

    @CreationTimestamp
    @Column(name = "create_time")
    private LocalDateTime createTime;

    @Column(name = "is_new_notification")
    private Boolean isNewNotification;

    @Column(name = "community_id")
    private Long communityId;

    @Column(nullable = false, length = 15)
    private String nickname;
}
