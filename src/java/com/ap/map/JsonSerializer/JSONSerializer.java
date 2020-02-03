/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ap.map.JsonSerializer;

import com.ap.map.model.Message;
import java.util.List;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
 * @author IlCordio
 */
public class JSONSerializer {

    public static JSONObject postToJSON(Message m) {
        JSONObject postJSON = new JSONObject();
        postJSON.put("id", m.getId());
        postJSON.put("content", m.getContent());
        postJSON.put("lat", m.getLat());
        postJSON.put("lon", m.getLon());
        return postJSON;
    }

    public static JSONArray postListToJSON(List<Message> messages) {
        JSONArray messageJSON = new JSONArray();
        for (Message m : messages) {
            messageJSON.add(JSONSerializer.postToJSON(m));
        }
        return messageJSON;
    }

}
