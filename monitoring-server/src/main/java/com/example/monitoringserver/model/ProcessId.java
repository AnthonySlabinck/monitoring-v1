package com.example.monitoringserver.model;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;

public class ProcessId {

	private final String value;

	private ProcessId(String value) {
		this.value = value;
	}

	public static ProcessId of(String value) {
		checkNotNull(value);
		checkArgument(value.trim().length() > 0);
		return new ProcessId(value);
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		ProcessId processId = (ProcessId) o;
		return Objects.equals(value, processId.value);
	}

	@Override
	public int hashCode() {
		return Objects.hash(value);
	}

	@Override
	@JsonValue
	public String toString() {
		return value;
	}
}
