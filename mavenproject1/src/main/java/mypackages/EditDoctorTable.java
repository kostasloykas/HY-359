/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mypackages;

import com.google.gson.Gson;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author Mike
 */
public class EditDoctorTable {

    public void addDoctorFromJSON(String json) throws ClassNotFoundException {
        Doctor doc = jsonToDoctor(json);
        addNewDoctor(doc);
    }

    public Doctor jsonToDoctor(String json) {
        Gson gson = new Gson();

        Doctor doc = gson.fromJson(json, Doctor.class);
        return doc;
    }

    public String doctorToJSON(Doctor doc) {
        Gson gson = new Gson();

        String json = gson.toJson(doc, Doctor.class);
        return json;
    }

    public void updateDoctor(String username, int height) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update = "UPDATE doctors SET height='" + height + "' WHERE username = '" + username + "'";
        stmt.executeUpdate(update);
    }

    public void deleteDoctor(String amka) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update = "DELETE FROM doctors WHERE amka=" + amka;
        stmt.executeUpdate(update);
    }

    public void printDoctorDetails(String username, String password) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM doctors WHERE username = '" + username + "' AND password='" + password + "'");
            while (rs.next()) {
                System.out.println("===Result===");
                DB_Connection.printResults(rs);
            }

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
    }

    public Doctor databaseToDoctor(String username, String password) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM doctors WHERE username = '" + username + "' AND password='" + password + "'");
            rs.next();
            String json = DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            Doctor doc = gson.fromJson(json, Doctor.class);
            return doc;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public ArrayList<Doctor> databaseToDoctors() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Doctor> doctors=new ArrayList<Doctor>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM doctors");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Doctor doc = gson.fromJson(json, Doctor.class);
                doctors.add(doc);
            }
            return doctors;

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public ArrayList<Doctor> databaseToDoctorsCertified() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Doctor> doctors = new ArrayList<Doctor>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT  firstname,lastname,address,city,doctor_info,specialty,telephone,lat,lon,username,birthdate,amka,doctor_id,certified FROM doctors WHERE certified= 1; ");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Doctor doc = gson.fromJson(json, Doctor.class);
                doctors.add(doc);
            }
            return doctors;

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public ArrayList<Doctor> databaseToDoctorsNotCertified() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Doctor> doctors = new ArrayList<Doctor>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT  firstname,lastname,address,city,doctor_info,specialty,telephone,lat,lon,username,birthdate,amka,doctor_id,certified FROM doctors WHERE certified= 0; ");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Doctor doc = gson.fromJson(json, Doctor.class);
                doctors.add(doc);
            }
            return doctors;

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public String databaseToJSON(String username, String password) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM doctors WHERE username = '" + username + "' AND password='" + password + "'");
            rs.next();
            String json = DB_Connection.getResultsToJSON(rs);
            return json;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public String databaseToJSONCertified(String username, String password) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM doctors WHERE username = '" + username + "' AND password='" + password + "' AND certified = '1'");
            rs.next();
            String json = DB_Connection.getResultsToJSON(rs);
            return json;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public JSONArray convertToJSON(ResultSet resultSet)
            throws Exception {
        JSONArray jsonArray = new JSONArray();
        while (resultSet.next()) {
            int total_rows = resultSet.getMetaData().getColumnCount();
            JSONObject obj = new JSONObject();
            for (int i = 0; i < total_rows; i++) {
                obj.put(resultSet.getMetaData().getColumnLabel(i + 1)
                        .toLowerCase(), resultSet.getObject(i + 1));
                jsonArray.put(obj);
            }
        }
        return jsonArray;
    }

    public void createDoctorTable() throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        String query = "CREATE TABLE doctors"
                + "(doctor_id INTEGER not NULL AUTO_INCREMENT, "
                + "    username VARCHAR(30) not null unique,"
                + "    email VARCHAR(40) not null unique,	"
                + "    password VARCHAR(32) not null,"
                + "    firstname VARCHAR(20) not null,"
                + "    lastname VARCHAR(30) not null,"
                + "    birthdate DATE not null,"
                + "    gender  VARCHAR (7) not null,"
                + "    amka VARCHAR (11) not null,"
                + "    country VARCHAR(30) not null,"
                + "    city VARCHAR(50) not null,"
                + "    address VARCHAR(50) not null,"
                + "    lat DOUBLE,"
                + "    lon DOUBLE,"
                + "    telephone VARCHAR(14) not null,"
                + "    height INTEGER,"
                + "    weight DOUBLE,"
                + "   blooddonor BOOLEAN,"
                + "   bloodtype VARCHAR(7) not null,"
                + "   specialty VARCHAR(30) not null,"
                + "   doctor_info VARCHAR(500) not null,"
                + "   certified BOOLEAN,"
                + " PRIMARY KEY ( doctor_id))";
        stmt.execute(query);
        stmt.close();
    }

    /**
     * Establish a database connection and add in the database.
     *
     * @throws ClassNotFoundException
     */
    public void addNewDoctor(Doctor doc) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " doctors (username,email,password,firstname,lastname,birthdate,gender,amka,country,city,address,"
                    + "lat,lon,telephone,height,weight,blooddonor,bloodtype,specialty,doctor_info,certified)"
                    + " VALUES ("
                    + "'" + doc.getUsername() + "',"
                    + "'" + doc.getEmail() + "',"
                    + "'" + doc.getPassword() + "',"
                    + "'" + doc.getFirstname() + "',"
                    + "'" + doc.getLastname() + "',"
                    + "'" + doc.getBirthdate() + "',"
                    + "'" + doc.getGender() + "',"
                    + "'" + doc.getAmka() + "',"
                    + "'" + doc.getCountry() + "',"
                    + "'" + doc.getCity() + "',"
                    + "'" + doc.getAddress() + "',"
                    + "'" + doc.getLat() + "',"
                    + "'" + doc.getLon() + "',"
                    + "'" + doc.getTelephone() + "',"
                    + "'" + doc.getHeight() + "',"
                    + "'" + doc.getWeight() + "',"
                    + "'" + doc.getBlooddonor() + "',"
                    + "'" + doc.getBloodtype() + "',"
                    + "'" + doc.getSpecialty() + "',"
                    + "'" + doc.getDoctor_info() + "',"
                    + "'" + doc.getCertified() + "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The doctor was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditDoctorTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public String databaseToJSON(String username) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM doctors WHERE username = '" + username + "'");
            rs.next();
            String json = DB_Connection.getResultsToJSON(rs);
            return json;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public String databaseToJSONemail(String email) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM doctors WHERE email = '" + email + "'");
            rs.next();
            String json = DB_Connection.getResultsToJSON(rs);
            return json;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public String databaseToJSONamka(String amka) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM doctors WHERE amka = " + amka);
            rs.next();
            String json = DB_Connection.getResultsToJSON(rs);
            return json;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public boolean certifyDoctor(String amka) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update = "UPDATE doctors SET certified=1 WHERE amka=" + amka;
        if (stmt.executeUpdate(update) != 1) {
            return false;
        }
        return true;
    }
}
