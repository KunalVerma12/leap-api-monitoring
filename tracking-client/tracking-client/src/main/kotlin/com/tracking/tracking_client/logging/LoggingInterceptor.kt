package com.tracking.tracking_client.logging

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate
import org.springframework.web.servlet.HandlerInterceptor
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import java.time.Instant

@Component
class LoggingInterceptor(
    @Value("\${collector.url}") private val collectorUrl: String
) : HandlerInterceptor {

    // Create RestTemplate here to avoid circular dependency
    private val restTemplate = RestTemplate()

    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        request.setAttribute("startTime", System.currentTimeMillis())
        return true
    }

    override fun afterCompletion(
        request: HttpServletRequest,
        response: HttpServletResponse,
        handler: Any,
        ex: Exception?
    ) {
        val start = request.getAttribute("startTime") as? Long ?: return
        val latency = System.currentTimeMillis() - start

        val log = mapOf(
            "service" to "tracking-client",
            "endpoint" to request.requestURI,
            "method" to request.method,
            "status" to response.status,
            "latency" to latency,
            "timestamp" to Instant.now().toString()
        )

        try {
            restTemplate.postForObject(collectorUrl, log, String::class.java)
        } catch (e: Exception) {
            println("Failed to send log to collector: ${e.message}")
        }
    }
}
