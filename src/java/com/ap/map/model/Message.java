/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ap.map.model;

/**
 *
 * @author IlCordio
 */
public class Message {

    private int id;
    private String content;
    private double lat;
    private double lon;


    public Message(String content, double lat, double lon) {
        this.content = content;
        this.lat = lat;
        this.lon = lon;
    }
    
    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }

}
