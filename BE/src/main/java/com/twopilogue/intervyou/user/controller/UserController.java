package com.twopilogue.intervyou.user.controller;

import com.twopilogue.intervyou.common.dto.BaseResponse;
import com.twopilogue.intervyou.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.twopilogue.intervyou.user.constant.UserConstant.LOGIN_SUCCESS_MESSAGE;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/login")
    public ResponseEntity<BaseResponse> login(@RequestParam("code") String code) {
        return new ResponseEntity<>(BaseResponse.from(LOGIN_SUCCESS_MESSAGE, userService.login(code)), HttpStatus.OK);
    }

}
