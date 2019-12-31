package com.example.monitoringserver.service;

import com.example.monitoringserver.model.ProcessConfig;
import com.example.monitoringserver.model.ProcessId;
import com.example.monitoringserver.model.Queue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class ProcessConfigServiceImpl implements ProcessConfigService {

	private static final String DLQ_PREFIX = "DLQ.";

	@Autowired
	private QueueService queueService;

	@Override
	public List<ProcessConfig> getConfigs() {
		return queueService.getQueues()
			.stream()
			.filter(q -> !q.toString().startsWith(DLQ_PREFIX))
			.map(convertToProcessConfig)
			.collect(Collectors.toList());
	}

	@Override
	public Optional<ProcessConfig> getConfig(final ProcessId processId) {
		checkNotNull(processId);
		checkArgument(!processId.toString().startsWith(DLQ_PREFIX));
		return queueService.getQueues()
			.stream()
			.filter(q -> processId.toString().equals(q.toString()))
			.map(convertToProcessConfig)
			.findAny();
	}

	private Function<Queue, ProcessConfig> convertToProcessConfig = queue -> {
		ProcessId processId = ProcessId.of(queue.toString());
		Queue errorQueue = Queue.of(DLQ_PREFIX + queue.toString());
		return ProcessConfig.of(processId, queue, errorQueue);
	};
}
