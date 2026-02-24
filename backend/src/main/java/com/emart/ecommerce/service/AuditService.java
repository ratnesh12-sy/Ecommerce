package com.emart.ecommerce.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuditService {

    private static final Logger logger = LoggerFactory.getLogger("AUDIT_LOG");

    public void log(String action, String username, String details) {
        String logMessage = String.format("[%s] ACTION: %s | USER: %s | DETAILS: %s",
                LocalDateTime.now(), action, username, details);
        logger.info(logMessage);

        // In a production app, you would also save this to a database table:
        // auditRepository.save(new AuditLog(action, username, details,
        // LocalDateTime.now()));
        System.out.println("AUDIT LOG: " + logMessage);
    }
}
