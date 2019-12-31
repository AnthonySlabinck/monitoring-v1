package com.example.monitoringserver.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AngularForwardController {

	@RequestMapping(value = "/**/{[path:[^\\.]*}")
	public String redirect() {
		return "forward:/";
	}
}
