package com.twopilogue.intervyou.community.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comment")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 15)
    private String nickname;

    @Column(name = "community_id", nullable = false)
    private Long communityId;

    @Column(name = "parent_community_id")
    private Long parentCommentId;

    @Column(name = "comment_content", nullable = false, length = 1000)
    private String commentContent;

    private int depth;

    private int commentGroup;

    @CreationTimestamp
    @Column(name = "create_time")
    private LocalDateTime createTime;

    @UpdateTimestamp
    @Column(name = "update_time")
    private LocalDateTime updateTime;

    @Column(name = "delete_time")
    private LocalDateTime deleteTime;

    public void modifyComment(final String commentContent) {
        this.commentContent = commentContent;
    }

    public void removeComment() {
        this.deleteTime = LocalDateTime.now();
    }
}
