package com.twopilogue.intervyou.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import static com.twopilogue.intervyou.config.constant.ConfigConstant.HEADER_STRING;
import static com.twopilogue.intervyou.config.constant.ConfigConstant.TOKEN_PREFIX;

@Configuration
public class OpenAiConfig {

    @Value("${openai.api.secret-key}")
    private String openAiKey;

    @Bean
    public RestTemplate template() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add((request, body, execution) -> {
            request.getHeaders().add(HEADER_STRING, TOKEN_PREFIX + openAiKey);
            return execution.execute(request, body);
        });
        return restTemplate;
    }

}
