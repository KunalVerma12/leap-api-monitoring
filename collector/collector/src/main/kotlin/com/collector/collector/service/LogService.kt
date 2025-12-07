package com.collector.collector.service

import com.collector.collector.model.ApiLog
import com.collector.collector.model.Alert
import com.collector.collector.repository.logs.AlertRepository
import com.collector.collector.repository.logs.ApiLogRepository
import org.springframework.stereotype.Service

@Service
class LogService(
    private val apiLogRepository: ApiLogRepository,
    private val alertRepository: AlertRepository
) {

    fun saveLog(log: ApiLog) {
        apiLogRepository.save(log)

        // Create alerts based on conditions
        if (log.latency > 500) {
            alertRepository.save(
                Alert(
                    service = log.service,
                    endpoint = log.endpoint,
                    type = "SLOW"
                )
            )
        }

        if (log.status >= 500) {
            alertRepository.save(
                Alert(
                    service = log.service,
                    endpoint = log.endpoint,
                    type = "ERROR"
                )
            )
        }
    }

    fun getAllLogs(): List<ApiLog> = apiLogRepository.findAll()

    fun getAllAlerts(): List<Alert> = alertRepository.findAll()
}