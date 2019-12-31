package com.example.monitoringserver.service;

import com.example.monitoringserver.model.MessageDetail;
import com.example.monitoringserver.model.MessageId;
import com.example.monitoringserver.model.Process;
import com.example.monitoringserver.model.ProcessId;

import java.util.List;
import java.util.Optional;

public interface ProcessService {

	List<Process> getProcesses();

	Optional<Process> getProcess(ProcessId processId);

	Optional<MessageDetail> getFailedMessageDetail(ProcessId processId, MessageId messageId);

	Optional<MessageDetail> getPendingMessageDetail(ProcessId processId, MessageId messageId);
}
