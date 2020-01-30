/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ap.map.web;

import com.ap.map.JsonSerializer.JSONSerializer;
import com.ap.map.model.Message;
import com.ap.map.model.MessageDAO;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author IlCordio
 */
@WebServlet(name = "MessageServlet", urlPatterns = {"/messages"})
public class MessageServlet extends HttpServlet {

    private MessageDAO messageDao;

    @Override
    public void init() throws ServletException {
        super.init(); //To change body of generated methods, choose Tools | Templates.
        try {
            messageDao = MessageDAO.getInstance();
        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(MessageServlet.class.getName()).log(Level.SEVERE, null, ex);
        }    
    }


    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            
        JSONObject out = new JSONObject();   
        out.put("message", JSONSerializer.postListToJSON(messageDao.getAll()));
        PrintWriter writer = response.getWriter();
        writer.write(out.toJSONString());
        writer.flush();
        writer.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            String body = req.getReader().lines().collect(Collectors.joining((System.lineSeparator())));
            JSONParser parser = new JSONParser();
            JSONObject parseJson = (JSONObject) parser.parse(body);
            messageDao.addToDB(new Message(parseJson.get("content").toString(),Double.parseDouble(parseJson.get("lat").toString()),Double.parseDouble(parseJson.get("lon").toString())));
        } catch (ParseException | SQLException ex) {
            Logger.getLogger(MessageServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
