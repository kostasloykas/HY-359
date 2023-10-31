/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import mypackages.EditSimpleUserTable;

/**
 * @author loukas
 */
public class login_admin extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet servlet_login</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet servlet_login at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");

        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        HttpSession session = request.getSession(true);
        try (PrintWriter out = response.getWriter()) {
            EditSimpleUserTable user_table = new EditSimpleUserTable();
            if (user_table.databaseUserToJSON(username, password) == null) {
                response.setStatus(401);
            } else if (request.getParameter("username") == "admin") {
                session.setAttribute("loggedIn", username);
                response.setStatus(200);
            } else {
                response.setStatus(402);
            }

        } catch (SQLException ex) {
            Logger.getLogger(servlet_login.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(servlet_login.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
