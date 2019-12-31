package com.example.monitoringserver.service;

import com.example.monitoringserver.model.ProcessConfig;
import com.example.monitoringserver.model.ProcessId;

import java.util.List;
import java.util.Optional;

public interface ProcessConfigService {

	List<ProcessConfig> getConfigs();

	Optional<ProcessConfig> getConfig(ProcessId processId);
}
