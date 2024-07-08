package com.twopilogue.intervyou.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.twopilogue.intervyou.user.entity.User;
import com.twopilogue.intervyou.user.exception.UserErrorResult;
import com.twopilogue.intervyou.user.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

import static com.twopilogue.intervyou.config.constant.ConfigConstant.*;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    @Value("${intervyou.jwt.secret}")
    private String secretKey;

    @Value("${intervyou.jwt.access.expires}")
    private long accessExpires;

    @Value("${intervyou.jwt.header}")
    private String header;

    @Value("${intervyou.jwt.prefix}")
    private String prefix;

    public String createToken(final User user) {
        return createAccessToken(user);
    }

    public String createAccessToken(final User user) {
        return JWT.create()
                .withSubject(SUBJECT)
                .withExpiresAt(new Date(System.currentTimeMillis() + accessExpires))
                .withClaim(KEY_ID, user.getId())
                .withClaim(KEY_NAVER_ID_TOKEN, user.getNaverIdToken())
                .sign(Algorithm.HMAC512(secretKey));
    }

    public boolean validateHeader(HttpServletRequest request) {
        String jwtHeader = getHeader(request);
        if (jwtHeader == null || !jwtHeader.startsWith(prefix)) {
            request.setAttribute(KEY_EXCEPTION, UserErrorResult.FAIL_VALIDATE_TOKEN);
            throw new UserException(UserErrorResult.FAIL_VALIDATE_TOKEN);
        }
        return true;
    }

    public String validateToken(HttpServletRequest request) {
        final String jwtToken = getToken(getHeader(request));
        try {
            if (JWT.decode(jwtToken).getExpiresAt().before(new Date())) {
                request.setAttribute(KEY_EXCEPTION, UserErrorResult.FAIL_VALIDATE_TOKEN);
                throw new UserException(UserErrorResult.EXPIRED_ACCESS_TOKEN) {
                };
            }
            return JWT.require(Algorithm.HMAC512(secretKey))
                    .build()
                    .verify(jwtToken)
                    .getClaim(KEY_NAVER_ID_TOKEN)
                    .asString();
        } catch (Exception e) {
            request.setAttribute(KEY_EXCEPTION, UserErrorResult.FAIL_VALIDATE_TOKEN);
            throw new UserException(UserErrorResult.FAIL_VALIDATE_TOKEN);
        }
    }

    private String getHeader(HttpServletRequest request) {
        return request.getHeader(header);
    }

    private String getToken(String header) {
        return header.replace(prefix, "");
    }

}
