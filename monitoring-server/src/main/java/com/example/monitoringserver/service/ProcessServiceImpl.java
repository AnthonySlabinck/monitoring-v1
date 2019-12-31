package com.example.monitoringserver.service;

import com.example.monitoringserver.model.Message;
import com.example.monitoringserver.model.MessageDetail;
import com.example.monitoringserver.model.MessageId;
import com.example.monitoringserver.model.Process;
import com.example.monitoringserver.model.ProcessConfig;
import com.example.monitoringserver.model.ProcessId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class ProcessServiceImpl implements ProcessService {

	@Autowired
	private ProcessConfigService processConfigService;

	@Autowired
	private MessageService messageService;

	@Override
	public List<Process> getProcesses() {
		return processConfigService.getConfigs()
			.parallelStream()
			.map(convertToProcess)
			.collect(Collectors.toList());
	}

	@Override
	public Optional<Process> getProcess(final ProcessId processId) {
		checkNotNull(processId);
		return processConfigService.getConfig(processId).map(convertToProcess);
	}

	@Override
	public Optional<MessageDetail> getFailedMessageDetail(final ProcessId processId, final MessageId messageId) {
		checkNotNull(processId);
		checkNotNull(messageId);
		return processConfigService.getConfig(processId)
			.flatMap(c -> messageService.getMessageDetail(c.getErrorQueue(), messageId));
	}

	@Override
	public Optional<MessageDetail> getPendingMessageDetail(final ProcessId processId, final MessageId messageId) {
		checkNotNull(processId);
		checkNotNull(messageId);
		return processConfigService.getConfig(processId)
			.flatMap(c -> messageService.getMessageDetail(c.getInQueue(), messageId));
	}

	private Function<ProcessConfig, Process> convertToProcess = processConfig -> {
		List<Message> pendingMessages = messageService.getMessages(processConfig.getInQueue());
		List<Message> failedMessages = messageService.getMessages(processConfig.getErrorQueue());
		return Process.of(processConfig.getProcessId(), pendingMessages, failedMessages);
	};
}
