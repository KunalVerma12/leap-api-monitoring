package com.tracking.tracking_client.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class DemoController {

    @GetMapping("/orders")
    fun getOrders(): String {
        Thread.sleep(150)
        return "Orders OK"
    }

    @GetMapping("/payments")
    fun getPayments(): String {
        Thread.sleep(350)
        return "Payments OK"
    }
}
