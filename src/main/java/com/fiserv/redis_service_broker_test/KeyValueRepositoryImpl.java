package com.fiserv.redis_service_broker_test;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

/**
 * @author michael.hug@fiserv.com
 * Fiserv Internal Software
 */

@Repository
public class KeyValueRepositoryImpl implements KeyValueRepository {

    private RedisTemplate<String, String> redisTemplate;
    private ValueOperations<String, String> valueOperations;

    @Autowired
    public KeyValueRepositoryImpl(RedisTemplate<String, String> redisTemplate) {
            this.redisTemplate = redisTemplate;
    }

    @PostConstruct
    private void init() {
            valueOperations = redisTemplate.opsForValue();
    }

    @Override
    public String get(String key) {
        return valueOperations.get(key);
    }

    @Override
    public void set(String key, String value) {
        valueOperations.set(key, value);
    }

    @Override
    public void del(String key) {
        redisTemplate.delete(key);
    }

    @Override
    public Set<String> getAllKeys() {
        return redisTemplate.keys("*");
    }
    
    @Override
    public Map<String, String> getAllKeyValues() {
        Map<String, String> ret = new HashMap();
        getAllKeys().forEach((i) -> {
            ret.put(i, get(i));
        });
        return ret;
    }

    @Override
    public void flushAll() {
        getAllKeys().forEach((i) -> {
            del(i);
        });
    }
}