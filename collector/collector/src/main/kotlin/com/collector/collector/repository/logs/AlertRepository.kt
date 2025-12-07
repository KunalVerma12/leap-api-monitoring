package com.collector.collector.repository.logs

import com.collector.collector.model.Alert
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface AlertRepository : MongoRepository<Alert, String>