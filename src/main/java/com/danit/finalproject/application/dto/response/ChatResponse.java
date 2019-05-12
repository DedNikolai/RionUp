package com.danit.finalproject.application.dto.response;

import java.util.List;

import com.danit.finalproject.application.dto.request.UserRequest;
import com.danit.finalproject.application.dto.view.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
public class ChatResponse {

  private Long id;
  private String name;
  private List<ChatMessageResponse> chatMessages;

}
