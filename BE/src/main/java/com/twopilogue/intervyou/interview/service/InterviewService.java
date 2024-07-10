package com.twopilogue.intervyou.interview.service;

import com.twopilogue.intervyou.interview.dto.chatgpt.ChatGPTRequest;
import com.twopilogue.intervyou.interview.dto.chatgpt.ChatGPTResponse;
import com.twopilogue.intervyou.interview.dto.chatgpt.Message;
import com.twopilogue.intervyou.interview.dto.request.StartInterviewRequest;
import com.twopilogue.intervyou.interview.dto.response.CheckOngoingInterviewResponse;
import com.twopilogue.intervyou.interview.dto.response.InterviewContentResponse;
import com.twopilogue.intervyou.interview.dto.response.InterviewResponse;
import com.twopilogue.intervyou.interview.dto.response.StartInterviewResponse;
import com.twopilogue.intervyou.interview.entity.Interview;
import com.twopilogue.intervyou.interview.entity.InterviewSequence;
import com.twopilogue.intervyou.interview.exception.InterviewErrorResult;
import com.twopilogue.intervyou.interview.exception.InterviewException;
import com.twopilogue.intervyou.interview.repository.InterviewRepository;
import com.twopilogue.intervyou.interview.repository.InterviewSequenceRepository;
import com.twopilogue.intervyou.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class InterviewService {

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;

    private final InterviewRepository interviewRepository;
    private final InterviewSequenceRepository interviewSequenceRepository;
    private final RestTemplate template;

    private String localDateTimeToString(final LocalDateTime time) {
        final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return time.format(formatter);
    }

    private String makePrompt(final StartInterviewRequest startInterviewRequest) {
        final StringBuilder prompt_sb = new StringBuilder();
        prompt_sb.append(startInterviewRequest.getJob()).append("직무에 지원했는데, 면접 시뮬레이션을 진행해 주세요.");
        if (startInterviewRequest.getInterviewType() == 1) {
            prompt_sb.append("아래 질문 목록에서 무작위로 하나씩 질문해 주세요. ");
        } else if (startInterviewRequest.getInterviewType() == 2) {
            prompt_sb.append(startInterviewRequest.getQuestionType()).append("에 관한 질문을 ").append(startInterviewRequest.getQuestionCount()).append("개를 만들어서 하나씩 질문해 주세요.");
        } else {
            throw new InterviewException(InterviewErrorResult.BAD_REQUEST);
        }
        prompt_sb.append("제가 답변을 한 후에 다음 질문을 해 주세요. 질문과 답변을 번갈아 가면서 진행합시다. GPT는 답변하지 말고 질문만 해 주세요. 피드백은 면접이 끝나고 마지막에 개선점 위주로 주시면 됩니다.");
        prompt_sb.append("\n").append("\n").append("질문할 때는 번호와 질문만 보내주세요.");

        if (startInterviewRequest.getInterviewType() == 1) {
            prompt_sb.append("\n").append("\n").append("질문 목록:");
            for (String question : startInterviewRequest.getQuestionList()) {
                prompt_sb.append("\n").append(question);
            }
        }
        prompt_sb.append("\n").append("\n").append("면접 시작하겠습니다. 질문 하나를 하시면 제가 답변하겠습니다.");

        return prompt_sb.toString();
    }

    private String callChatGpt(final List<Message> messages) {
        final ChatGPTRequest request = new ChatGPTRequest(model, messages);
        final ChatGPTResponse chatGPTResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);
        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }

    public StartInterviewResponse startInterview(final User user, final StartInterviewRequest startInterviewRequest) {

        if (interviewRepository.existsByUserIdAndIsActiveTrue(user.getId())) {
            throw new InterviewException(InterviewErrorResult.ALREADY_ONGOING_INTERVIEW);
        }

        final Interview interview = interviewRepository.save(Interview.builder()
                .job(startInterviewRequest.getJob())
                .questionCount(startInterviewRequest.getQuestionCount())
                .isActive(true)
                .userId(user.getId())
                .build());

        final String prompt = makePrompt(startInterviewRequest);

        interviewSequenceRepository.save(InterviewSequence.builder()
                .sequence(1)
                .content(prompt)
                .interview(interview)
                .build());

        final List<Message> messages = new ArrayList<>();
        messages.add(new Message("user", prompt));

        final InterviewSequence interviewSequence = interviewSequenceRepository.save(InterviewSequence.builder()
                .sequence(2)
                .content(callChatGpt(messages))
                .interview(interview)
                .build());

        return StartInterviewResponse.builder()
                .interviewId(interview.getId())
                .question(InterviewContentResponse.builder()
                        .sequence(interviewSequence.getSequence())
                        .content(interviewSequence.getContent())
                        .createTime(localDateTimeToString(interviewSequence.getCreateTime()))
                        .build())
                .build();
    }

    public CheckOngoingInterviewResponse checkOngoingInterview(final User user) {
        final Interview interview = interviewRepository.findByUserIdAndIsActiveTrue(user.getId());
        if (interview == null) {
            return null;
        }
        return CheckOngoingInterviewResponse.builder()
                .interviewId(interview.getId())
                .build();
    }

    public InterviewResponse readOngoingInterview(final User user, final Long interviewId) {
        final Interview interview = interviewRepository.findByUserIdAndIsActiveTrue(user.getId());
        if (interview == null || !interview.getId().equals(interviewId)) {
            throw new InterviewException(InterviewErrorResult.NO_ONGOING_INTERVIEW);
        }

        final List<InterviewSequence> interviewSequenceList = interviewSequenceRepository.findAllByInterviewIdOrderBySequence(interviewId);
        return InterviewResponse.builder()
                .interviewId(interview.getId())
                .createTime(localDateTimeToString(interview.getCreateTime()))
                .interviews(interviewSequenceList.stream().map(
                        interviewSequence -> InterviewContentResponse.builder()
                                .sequence(interviewSequence.getSequence())
                                .content(interviewSequence.getContent())
                                .createTime(localDateTimeToString(interviewSequence.getCreateTime()))
                                .build()
                ).collect(Collectors.toList()))
                .build();
    }

    public void endInterview(final User user, final Long interviewId) {
        final Interview interview = interviewRepository.findByUserIdAndIsActiveTrue(user.getId());
        if (interview == null || !interview.getId().equals(interviewId)) {
            throw new InterviewException(InterviewErrorResult.INVALID_INTERVIEW_ID);
        }
        interview.endInterview();
    }

    public void removeInterview(final User user, final Long interviewId) {
        final Interview interview = interviewRepository.findByIdAndUserId(interviewId, user.getId());
        if (interview == null) {
            throw new InterviewException(InterviewErrorResult.NOTFOUND_INTERVIEW);
        }

        if (interview.getIsActive()) {
            throw new InterviewException(InterviewErrorResult.FAILED_REMOVE_ONGOING_INTERVIEW);
        }

        interviewSequenceRepository.deleteAllByInterviewId(interviewId);
        interviewRepository.delete(interview);
    }
}
