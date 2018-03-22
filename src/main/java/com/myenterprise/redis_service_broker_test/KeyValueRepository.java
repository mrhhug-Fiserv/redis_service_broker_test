package com.myenterprise.redis_service_broker_test;

import java.util.Map;
import java.util.Set;

/**
 * @author Michael Hug
 */

public interface KeyValueRepository {

        String get(String key);
	void set(String key, String value);
	void del(String key);
        Map<String, String> getAllKeyValues();
        Set<String> getAllKeys();
        void flushAll();
}