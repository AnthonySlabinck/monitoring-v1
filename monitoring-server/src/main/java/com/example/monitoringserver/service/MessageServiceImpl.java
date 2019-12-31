package com.example.monitoringserver.service;

import com.example.monitoringserver.exception.MessageDetailsReadingException;
import com.example.monitoringserver.model.Message;
import com.example.monitoringserver.model.MessageDetail;
import com.example.monitoringserver.model.MessageId;
import com.example.monitoringserver.model.Queue;
import org.apache.activemq.command.ActiveMQMessage;
import org.apache.activemq.command.ActiveMQTextMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.BrowserCallback;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import javax.jms.JMSException;
import javax.jms.QueueBrowser;
import javax.jms.Session;
import java.io.IOException;
import java.util.Collections;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private JmsTemplate jmsTemplate;

	@Override
	public List<Message> getMessages(final Queue queue) {
		checkNotNull(queue);
		return jmsTemplate.browse(queue.toString(), new MessageReader());
	}

	@Override
	public Optional<MessageDetail> getMessageDetail(final Queue queue, final MessageId messageId) {
		checkNotNull(queue);
		checkNotNull(messageId);
		String messageSelector = "JMSMessageID = '" + messageId.toString() + "'";
		return jmsTemplate.browseSelected(queue.toString(), messageSelector, new MessageDetailReader());
	}

	private static class MessageReader implements BrowserCallback<List<Message>> {

		@Override
		public List<Message> doInJms(Session session, QueueBrowser browser) throws JMSException {
			Enumeration<ActiveMQMessage> messages = browser.getEnumeration();
			return Collections.list(messages)
				.stream()
				.map(oonvertToMessage)
				.collect(Collectors.toList());
		}

		private Function<ActiveMQMessage, Message> oonvertToMessage = message -> {
			MessageId messageId = MessageId.of(message.getJMSMessageID());
			return Message.of(messageId, new Date(message.getJMSTimestamp()));
		};
	}

	private static class MessageDetailReader implements BrowserCallback<Optional<MessageDetail>> {

		@Override
		public Optional<MessageDetail> doInJms(Session session, QueueBrowser browser) throws JMSException {
			Enumeration<ActiveMQMessage> messages = browser.getEnumeration();

			if (messages.hasMoreElements()) {
				ActiveMQMessage message = messages.nextElement();

				MessageId messageId = MessageId.of(message.getJMSMessageID());
				MessageDetail messageDetail = MessageDetail.of(messageId, new Date(message.getJMSTimestamp()));
				try {
					message.getProperties().forEach((key, value) -> messageDetail.addProperty(key, value.toString()));
				} catch (IOException e) {
					throw new MessageDetailsReadingException(e);
				}
				if (message instanceof ActiveMQTextMessage) {
					ActiveMQTextMessage textMessage = (ActiveMQTextMessage) message;
					messageDetail.setContent(textMessage.getText());
				} else {
					messageDetail.setContent("[" + message.getClass().getName() + "]");
				}
				return Optional.of(messageDetail);
			} else {
				return Optional.empty();
			}
		}
	}
}
