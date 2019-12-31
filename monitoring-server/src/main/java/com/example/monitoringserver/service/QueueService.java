package com.example.monitoringserver.service;

import com.example.monitoringserver.model.Queue;

import java.util.Set;

public interface QueueService {

	Set<Queue> getQueues();
}
