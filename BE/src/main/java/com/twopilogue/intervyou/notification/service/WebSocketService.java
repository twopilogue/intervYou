package com.twopilogue.intervyou.notification.service;

import com.twopilogue.intervyou.config.ServerEndpointConfig;
import org.springframework.stereotype.Service;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@Service
@ServerEndpoint(value = "/socket/notifications/{userId}", configurator = ServerEndpointConfig.class)
public class WebSocketService {

    private static Set<Session> users = Collections.synchronizedSet(new HashSet<>());
    private static HashMap<String, Long> userInfos = new HashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("userId") Long userId) {
        if (userId != null && !users.contains(session)) {
            System.out.println("들어옴 userId: " + userId + ", session: " + session);
            users.add(session);
            userInfos.put(session.getId(), userId);
        }
    }

    @OnMessage
    public void onMessage(Session session, String message) throws IOException {
        for (Session s : users) {
            s.getBasicRemote().sendText(message);
        }
    }

    @OnClose
    public void onClose(Session session) {
        if (users.contains(session)) {
            users.remove(session);
            userInfos.remove(session.getId());
        }
    }
}
