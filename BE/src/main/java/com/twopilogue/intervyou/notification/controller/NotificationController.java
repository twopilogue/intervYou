package com.twopilogue.intervyou.notification.controller;

import com.twopilogue.intervyou.common.BaseResponse;
import com.twopilogue.intervyou.config.auth.PrincipalDetails;
import com.twopilogue.intervyou.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static com.twopilogue.intervyou.notification.constant.NotificationConstant.READ_NOTIFICATION_LIST_SUCCESS_MESSAGE;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<BaseResponse> readNotificationList(@AuthenticationPrincipal final PrincipalDetails principalDetails) {
        return new ResponseEntity<>(BaseResponse.from(READ_NOTIFICATION_LIST_SUCCESS_MESSAGE, notificationService.readNotificationList(principalDetails.getUser())), HttpStatus.OK);
    }
}
