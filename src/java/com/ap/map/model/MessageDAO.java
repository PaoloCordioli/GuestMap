/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ap.map.model;

import java.sql.CallableStatement;
import java.sql.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
/**
 *
 * @author IlCordio
 *
 * DAO = Data Access OBject
 *
 * Pattern architetturale che descrive la modalità di accessomai dati salvati
 * "da qualche parte".
 *
 */
public class MessageDAO {

    private List<Message> messages;
    private Connection pdo;

    private static MessageDAO instance;

    public static MessageDAO getInstance() throws ClassNotFoundException, SQLException {
        if (instance == null) {
            instance = new MessageDAO();
        }
        return instance;
    }

    private MessageDAO() throws SQLException, ClassNotFoundException {
        Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
        pdo = DriverManager.getConnection("jdbc:derby://localhost:1527/Map", "test", "test");
        messages = new ArrayList<>();
    }

    public void addToDB(Message m) throws SQLException {
        CallableStatement st = pdo.prepareCall("INSERT INTO MESSAGE VALUES(?,?,?)");
        st.setString(1, m.getContent());
        st.setDouble(2, m.getLat());
        st.setDouble(3, m.getLon());
        st.execute();
    }

    public List<Message> getAll() {
        List<Message> messagges = new ArrayList<>();
        try {
            Statement stmt = pdo.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM Message");
            while (rs.next()) {
                messagges.add(new Message(rs.getString("content"), rs.getDouble("lat"), rs.getDouble("lon")));
            }
            rs.close();
        } catch (SQLException ex) {
            Logger.getLogger(MessageDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return messagges;
    }

}
