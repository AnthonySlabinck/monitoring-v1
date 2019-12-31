package com.example.monitoringserver.controller;

import com.example.monitoringserver.model.MessageDetail;
import com.example.monitoringserver.model.MessageId;
import com.example.monitoringserver.model.ProcessId;
import com.example.monitoringserver.service.ProcessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${rest.base-path}/processes")
public class ProcessMessageController {

	@Autowired
	private ProcessService processService;

	@GetMapping("/{processId}/failed-messages/{messageId:.+}")
	public ResponseEntity<MessageDetail> getFailedMessageDetail(@PathVariable String processId,
		@PathVariable String messageId) {
		return processService.getFailedMessageDetail(ProcessId.of(processId), MessageId.of(messageId))
			.map(ResponseEntity::ok)
			.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@GetMapping("/{processId}/pending-messages/{messageId:.+}")
	public ResponseEntity<MessageDetail> getPendingMessageDetail(@PathVariable String processId,
		@PathVariable String messageId) {
		return processService.getPendingMessageDetail(ProcessId.of(processId), MessageId.of(messageId))
			.map(ResponseEntity::ok)
			.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
}
