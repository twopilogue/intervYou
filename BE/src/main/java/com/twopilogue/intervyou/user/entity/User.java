package com.twopilogue.intervyou.user.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "naver_id_token", nullable = false, length = 65)
    private String naverIdToken;

    @Column(name = "withdrawal_time")
    private LocalDateTime withdrawalTime;

    public void withdrawal() {
        this.withdrawalTime = LocalDateTime.now();
    }
}
