package com.collector.collector.controller

import com.collector.collector.model.ApiLog
import com.collector.collector.model.Alert
import com.collector.collector.service.LogService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/logs")
class LogController(
    private val logService: LogService
) {

    @PostMapping
    fun receiveLog(@RequestBody log: ApiLog): ResponseEntity<String> {
        logService.saveLog(log)
        return ResponseEntity.ok("Log received")
    }

    @GetMapping
    fun getLogs(): List<ApiLog> = logService.getAllLogs()

    @GetMapping("/alerts")
    fun getAlerts(): List<Alert> = logService.getAllAlerts()
}
