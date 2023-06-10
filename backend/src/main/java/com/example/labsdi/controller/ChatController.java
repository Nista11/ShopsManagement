package com.example.labsdi.controller;

import com.example.labsdi.domain.Message;
import com.example.labsdi.domain.OutputMessage;
import com.example.labsdi.domain.SavedMessage;
import com.example.labsdi.service.ISavedMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class ChatController {

    @Autowired
    ISavedMessageService savedMessageService;

    @MessageMapping("/chat")
    @SendTo("/api/ws/topic/messages")
    public OutputMessage send(Message message) throws Exception {
        String time = new SimpleDateFormat("HH:mm").format(new Date());
        savedMessageService.saveMessage(new SavedMessage(null, message.getFrom(), message.getText(), time));
        return new OutputMessage(message.getFrom(), message.getText(), time);
    }

}
