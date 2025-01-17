package com.example.legalcases.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Override
    protected String getDatabaseName() {
        return "your_database_name";
    }

    @Override
    public boolean autoIndexCreation() {
        return true;
    }
}
