package com.example.monitoringserver.model;

import com.google.common.base.MoreObjects;
import com.google.common.collect.ImmutableList;

import java.util.List;
import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

public class Process {

	private ProcessId id;

	private List<Message> pendingMessages;

	private List<Message> failedMessages;

	private Process(ProcessId id, List<Message> pendingMessages, List<Message> failedMessages) {
		this.id = id;
		this.pendingMessages = pendingMessages;
		this.failedMessages = failedMessages;
	}

	public static Process of(ProcessId id, List<Message> pendingMessages, List<Message> failedMessages) {
		checkNotNull(id);
		checkNotNull(pendingMessages);
		checkNotNull(failedMessages);
		return new Process(id, pendingMessages, failedMessages);
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		Process process = (Process) o;
		return Objects.equals(id, process.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public String toString() {
		return MoreObjects.toStringHelper(this)
			.add("id", id)
			.add("pendingMessages", pendingMessages.size())
			.add("failedMessages", failedMessages.size())
			.toString();
	}

	public ProcessId getId() {
		return id;
	}

	public List<Message> getPendingMessages() {
		return ImmutableList.copyOf(pendingMessages);
	}

	public List<Message> getFailedMessages() {
		return ImmutableList.copyOf(failedMessages);
	}
}
