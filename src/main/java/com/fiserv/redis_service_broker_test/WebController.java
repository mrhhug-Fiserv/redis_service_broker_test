package com.fiserv.redis_service_broker_test;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author michael.hug@fiserv.com
 * Fiserv Internal Software
 */

@RestController("/api/")
public class WebController {

	@Autowired
	private KeyValueRepository keyValueRepository;

	@GetMapping("/api/get/{key}")
	public Map<String,String> get(@PathVariable String key) {
            System.out.println("/api/get/" + key + " was called");
            return new HashMap<String, String>() {{
                put(key, keyValueRepository.get(key));
            }};
	}
        
        @GetMapping("/api/get/*")
	public Map<String, String> getAllKeyValues() {
            System.out.println("/api/get/* was called");
            return keyValueRepository.getAllKeyValues();
	}
        
        @GetMapping("/api/info")
	public String VCAP_SERVICES() {
            System.out.println("/api/info was called");
            return System.getenv("VCAP_SERVICES").replaceAll("\"password\":\\s\".+?\"", "\"password\": \"<REDACTED>\"");
	}

        //never tested this
        @GetMapping("/api/info/{var}")
	public Map<String, String> environmentVariable(@PathVariable String var) {
            System.out.println("/api/info/" + var + " was called");
            return new HashMap<String, String>() {{
                put(var, System.getenv(var));
            }};
	}
        
	@PutMapping("/api/set/{key}/{value}")
	public void set(@PathVariable String key, @PathVariable String value) {
            System.out.println("/api/set/" + key + "/" + value + " was called");
            keyValueRepository.set(key, value);
	}
        
        @PutMapping("/api/set/random/{count}")
	public void setRandom(@PathVariable int count) {
            System.out.println("/api/set/random/" + count + " was called");
	    for (int i=0 ; i < count; i++) {
		UUID uuid = UUID.randomUUID();
		if( uuid.hashCode() % 12 == 0) { // because twelve is that largest one syllable number
                	keyValueRepository.set(uuid.toString() , "MichaelIsMetal");
		} else {
                	keyValueRepository.set(uuid.toString() , UUID.randomUUID().toString());
		}
	    }
	}
        
	@DeleteMapping("/api/del/{key}")
	public void del(@PathVariable String key) {
            System.out.println("/api/del/" + key + " was called");
            keyValueRepository.del(key);
	}
        
        @DeleteMapping("/api/del/*")
	public void flushAll() {
            System.out.println("/api/del/* was called");
            keyValueRepository.flushAll();
	}	

	@GetMapping("/api/setgethealthcheck")
	public void sutgethealthcheck() throws Exception {
            System.out.println("/api/setgethealthcheck was called");
	    String key = UUID.randomUUID().toString();
	    String value = UUID.randomUUID().toString();
	    set(key, value);
            System.out.println("Healthcheck just set pair " + key + ":" + value);
	    Map<String, String> ret = get(key);
	    if (!ret.get(key).equals(value)) {
		throw new Exception("Redis gave me back a different value than i put into it");
	    }
	    del(key);
	}
}
