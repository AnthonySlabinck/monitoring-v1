package com.example.monitoringserver.model;

import com.google.common.base.MoreObjects;

import java.util.Date;
import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

public class Message {

	private MessageId id;

	private Date timestamp;

	private Message(MessageId id, Date timestamp) {
		this.id = id;
		this.timestamp = timestamp;
	}

	public static Message of(MessageId id, Date timestamp) {
		checkNotNull(id);
		checkNotNull(timestamp);
		return new Message(id, timestamp);
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		Message message = (Message) o;
		return Objects.equals(id, message.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public String toString() {
		return MoreObjects.toStringHelper(this)
			.add("id", id)
			.add("timestamp", timestamp)
			.toString();
	}

	public MessageId getId() {
		return id;
	}

	public Date getTimestamp() {
		return timestamp;
	}
}
