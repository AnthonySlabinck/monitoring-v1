package com.example.monitoringserver.model;

import com.google.common.base.MoreObjects;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Maps;

import java.util.Date;
import java.util.Map;
import java.util.Objects;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;

public class MessageDetail {

	private MessageId id;

	private Date timestamp;

	private Map<String, String> properties = Maps.newHashMap();

	private String content;

	private MessageDetail(MessageId id, Date timestamp) {
		this.id = id;
		this.timestamp = timestamp;
	}

	public static MessageDetail of(MessageId id, Date timestamp) {
		checkNotNull(id);
		checkNotNull(timestamp);
		return new MessageDetail(id, timestamp);
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		MessageDetail messageDetail = (MessageDetail) o;
		return Objects.equals(id, messageDetail.id);
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
			.add("properties", properties)
			.add("content", content)
			.toString();
	}

	public MessageDetail addProperty(String key, String value) {
		checkNotNull(key);
		checkArgument(key.trim().length() > 0);
		properties.put(key, value);
		return this;
	}

	public MessageId getId() {
		return id;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public Map<String, String> getProperties() {
		return ImmutableMap.copyOf(properties);
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
