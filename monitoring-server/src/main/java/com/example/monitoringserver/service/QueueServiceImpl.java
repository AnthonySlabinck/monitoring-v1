package com.example.monitoringserver.service;

import com.example.monitoringserver.exception.QueuesLoadingException;
import com.example.monitoringserver.model.Queue;
import org.apache.activemq.ActiveMQConnection;
import org.apache.activemq.advisory.DestinationSource;
import org.apache.activemq.command.ActiveMQQueue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class QueueServiceImpl implements QueueService {

	@Autowired
	private ConnectionFactory jmsConnectionFactory;

	@Override
	public Set<Queue> getQueues() {
		try {
			Connection connection = null;
			try {
				connection = jmsConnectionFactory.createConnection();
				connection.start();
				DestinationSource destinationSource = ((ActiveMQConnection) connection).getDestinationSource();
				Set<ActiveMQQueue> queues = destinationSource.getQueues();
				return queues
					.stream()
					.map(convertToQueue)
					.collect(Collectors.toSet());
			} finally {
				if (connection != null) {
					connection.close();
				}
			}
		} catch (JMSException e) {
			throw new QueuesLoadingException(e);
		}
	}

	private Function<ActiveMQQueue, Queue> convertToQueue = q -> {
		try {
			return Queue.of(q.getQueueName());
		} catch (JMSException e) {
			throw new QueuesLoadingException(e);
		}
	};
}
