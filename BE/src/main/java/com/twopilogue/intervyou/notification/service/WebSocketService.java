package com.twopilogue.intervyou.notification.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twopilogue.intervyou.config.ServerEndpointConfig;
import com.twopilogue.intervyou.notification.dto.response.NotificationResponse;
import com.twopilogue.intervyou.user.entity.User;
import com.twopilogue.intervyou.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;

@Service
@ServerEndpoint(value = "/socket/notifications/{userId}", configurator = ServerEndpointConfig.class)
@RequiredArgsConstructor
public class WebSocketService {

    private static Set<Session> users = Collections.synchronizedSet(new HashSet<>());
    private static HashMap<String, String> userInfos = new HashMap<>();
    private static UserRepository userRepository;

    @OnOpen
    public void onOpen(final Session session, @PathParam("userId") final Long userId) {
        final User user = userRepository.findByIdAndWithdrawalTimeIsNull(userId);
        if (user != null && !users.contains(session)) {
            users.add(session);
            userInfos.put(session.getId(), user.getNickname());
        }
    }

    @OnMessage
    public void onMessage(final Session session, final String message) throws IOException {
        for (Session s : users) {
            s.getBasicRemote().sendText(message);
        }
    }

    @OnClose
    public void onClose(final Session session) {
        if (users.contains(session)) {
            users.remove(session);
            userInfos.remove(session.getId());
        }
    }

    public void sendNewNotification(final String nickname, final NotificationResponse notificationResponse) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        String jsonStr = mapper.writeValueAsString(notificationResponse);
        List<Session> receivers = new ArrayList<>();
        for (Map.Entry<String, String> entry : userInfos.entrySet()) {
            if (entry.getValue().equals(nickname)) {
                Session receiver = users.stream()
                        .filter(session -> session.getId().equals(entry.getKey()))
                        .findFirst()
                        .orElse(null);
                if (receiver != null) receivers.add(receiver);
            }
        }

        for (Session receiver : receivers) {
            receiver.getBasicRemote().sendText(jsonStr);
        }
    }
}
