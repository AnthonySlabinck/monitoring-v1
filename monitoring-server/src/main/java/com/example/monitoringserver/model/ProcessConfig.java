package com.example.monitoringserver.model;

import com.google.common.base.MoreObjects;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

public class ProcessConfig {

	private ProcessId processId;

	private Queue inQueue;

	private Queue errorQueue;

	private ProcessConfig(ProcessId processId, Queue inQueue, Queue errorQueue) {
		this.processId = processId;
		this.inQueue = inQueue;
		this.errorQueue = errorQueue;
	}

	public static ProcessConfig of(ProcessId processId, Queue inQueue, Queue errorQueue) {
		checkNotNull(processId);
		checkNotNull(inQueue);
		checkNotNull(errorQueue);
		return new ProcessConfig(processId, inQueue, errorQueue);
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		ProcessConfig that = (ProcessConfig) o;
		return Objects.equals(processId, that.processId) &&
			Objects.equals(inQueue, that.inQueue) &&
			Objects.equals(errorQueue, that.errorQueue);
	}

	@Override
	public int hashCode() {
		return Objects.hash(processId, inQueue, errorQueue);
	}

	@Override
	public String toString() {
		return MoreObjects.toStringHelper(this)
			.add("processId", processId)
			.add("inQueue", inQueue)
			.add("errorQueue", errorQueue)
			.toString();
	}

	public ProcessId getProcessId() {
		return processId;
	}

	public Queue getInQueue() {
		return inQueue;
	}

	public Queue getErrorQueue() {
		return errorQueue;
	}
}
