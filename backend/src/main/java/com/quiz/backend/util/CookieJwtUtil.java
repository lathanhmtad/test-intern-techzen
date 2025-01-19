package com.quiz.backend.util;

import com.quiz.backend.constant.AppConstants;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseCookie;
import org.springframework.web.util.WebUtils;

public class CookieJwtUtil {

    public static String setJwtCookie(String token, String jwtExpiration) {
        return ResponseCookie.from(AppConstants.COOKIE_NAME, token)
                .httpOnly(true)
                .path("/")
                .maxAge(TimeConverterUtil.getSeconds(jwtExpiration))
                .build().toString();
    }

    public static String getJwtCookie(HttpServletRequest request) {
        String cookieName = AppConstants.COOKIE_NAME;
        Cookie cookie = WebUtils.getCookie(request, cookieName);
        return cookie.getValue();
    }

    public static ResponseCookie clearJwtCookie() {
        return ResponseCookie.from(AppConstants.COOKIE_NAME, null)
                .httpOnly(true)
                .path("/")
                .maxAge(0) // Xóa cookie
                .build();
    }
}
