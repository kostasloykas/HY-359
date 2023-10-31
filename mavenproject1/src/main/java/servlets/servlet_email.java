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
import mypackages.EditDoctorTable;
import mypackages.EditSimpleUserTable;

/**
 *
 * @author loukas
 */
public class servlet_email extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        String email = request.getParameter("email");
        System.out.println(email);
        try ( PrintWriter out = response.getWriter()) {
            EditSimpleUserTable user_table = new EditSimpleUserTable();
            EditDoctorTable doctor_table = new EditDoctorTable();
            if (user_table.databaseUserToJSONemail(email) == null && doctor_table.databaseToJSONemail(email) == null) {
                response.setStatus(200);
            } else {
                response.setStatus(403); // yparxei auto to email sthn database
            }
        } catch (SQLException ex) {
            Logger.getLogger(servlet_username.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(servlet_username.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
