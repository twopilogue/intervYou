package com.twopilogue.intervyou.config.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twopilogue.intervyou.common.ErrorResponse;
import com.twopilogue.intervyou.user.exception.UserErrorResult;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.twopilogue.intervyou.config.constant.ConfigConstant.KEY_EXCEPTION;

@Component
public class JwtExceptionHandler implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        setResponse(response, (UserErrorResult) request.getAttribute(KEY_EXCEPTION));
    }

    private void setResponse(HttpServletResponse response, UserErrorResult userErrorResult) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(userErrorResult.getHttpStatus().value());
        ErrorResponse errorResponse = new ErrorResponse(userErrorResult.getMessage());
        ObjectMapper objectMapper = new ObjectMapper();
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}
