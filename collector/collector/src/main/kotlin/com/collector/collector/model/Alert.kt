package com.collector.collector.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.Instant

@Document(collection = "alerts")
data class Alert(
    @Id val id: String? = null,
    val service: String,
    val endpoint: String,
    val type: String,       // "SLOW", "ERROR", "RATE_LIMIT"
    val timestamp: Instant = Instant.now()
)
