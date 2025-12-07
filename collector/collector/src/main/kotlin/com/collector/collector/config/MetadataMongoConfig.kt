package com.collector.collector.config

import com.mongodb.client.MongoClients
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
    basePackages = ["com.collector.collector.repository.metadata"],
    mongoTemplateRef = "metadataMongoTemplate"
)
class MetadataMongoConfig {

    @Bean(name = ["metadataMongoFactory"])
    fun metadataMongoFactory(
        @Value("\${spring.data.mongodb.metadata.uri}") uri: String
    ): MongoDatabaseFactory {
        return SimpleMongoClientDatabaseFactory(MongoClients.create(uri), "metadatadb")
    }

    @Bean(name = ["metadataMongoTemplate"])
    fun metadataMongoTemplate(
        @Qualifier("metadataMongoFactory") factory: MongoDatabaseFactory
    ): MongoTemplate {
        return MongoTemplate(factory)
    }
}
