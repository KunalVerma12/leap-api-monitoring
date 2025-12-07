package com.collector.collector.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
class SecurityConfig {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() } // we don't need CSRF protection for this API-only backend right now
            .authorizeHttpRequests { auth ->
                auth
                    .anyRequest().permitAll()   // allow all endpoints without auth for now
            }

        return http.build()
    }
}
