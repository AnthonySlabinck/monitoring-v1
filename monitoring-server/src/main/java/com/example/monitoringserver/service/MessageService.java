package com.example.monitoringserver.service;

import com.example.monitoringserver.model.Message;
import com.example.monitoringserver.model.MessageDetail;
import com.example.monitoringserver.model.MessageId;
import com.example.monitoringserver.model.Queue;

import java.util.List;
import java.util.Optional;

public interface MessageService {

	List<Message> getMessages(Queue queue);

	Optional<MessageDetail> getMessageDetail(Queue queue, MessageId messageId);
}
