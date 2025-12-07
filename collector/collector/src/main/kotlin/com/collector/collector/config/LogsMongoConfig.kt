package com.collector.collector.config

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.MongoDatabaseFactory
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories

@Configuration
@EnableMongoRepositories(
    basePackages = ["com.collector.collector.repository.logs"],
    mongoTemplateRef = "logsMongoTemplate"
)
class LogsMongoConfig {

    @Bean(name = ["logsMongoFactory"])
    fun logsMongoFactory(@Value("\${spring.data.mongodb.logs.uri}") uri: String): MongoDatabaseFactory {
        return SimpleMongoClientDatabaseFactory(uri)
    }

    @Bean(name = ["logsMongoTemplate"])
    fun logsMongoTemplate(
        @Qualifier("logsMongoFactory") factory: MongoDatabaseFactory
    ): MongoTemplate {
        return MongoTemplate(factory)
    }
}