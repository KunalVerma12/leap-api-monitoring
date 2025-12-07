package com.collector.collector.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.Instant

@Document(collection = "api_logs")
data class ApiLog(
    @Id val id: String? = null,
    val service: String,
    val endpoint: String,
    val method: String,
    val status: Int,
    val latency: Long,
    val timestamp: Instant = Instant.now()
)
