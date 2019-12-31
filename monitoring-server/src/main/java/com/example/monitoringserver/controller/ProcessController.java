package com.example.monitoringserver.controller;

import com.example.monitoringserver.model.Process;
import com.example.monitoringserver.model.ProcessId;
import com.example.monitoringserver.service.ProcessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("${rest.base-path}/processes")
public class ProcessController {

	@Autowired
	private ProcessService processService;

	@GetMapping
	public List<Process> getProcesses() {
		return processService.getProcesses();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Process> getProcess(@PathVariable String id) {
		return processService
			.getProcess(ProcessId.of(id))
			.map(ResponseEntity::ok)
			.orElse(new ResponseEntity<>(NOT_FOUND));
	}
}
