/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Mike
 */
public class EditBloodTestTable {

   
    
    public void addBloodTestFromJSON(String json) throws ClassNotFoundException{
         BloodTest bt=jsonToBloodTest(json);
         bt.setValues();
         createNewBloodTest(bt);
    }
    
    public BloodTest jsonToBloodTest(String json) {
        Gson gson = new Gson();
        BloodTest btest = gson.fromJson(json, BloodTest.class);
        return btest;
    }
    
     public String bloodTestToJSON(BloodTest bt){
         Gson gson = new Gson();

        String json = gson.toJson(bt, BloodTest.class);
        return json;
    }

    public ArrayList<BloodTest> databaseToBloodTest1param(String amka) throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<BloodTest> bloodtests = new ArrayList<BloodTest>();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM bloodtest WHERE amka= '" + amka + "'");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                BloodTest bt = gson.fromJson(json, BloodTest.class);
                bloodtests.add(bt);
            }
            return bloodtests;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public ArrayList<BloodTest> databaseToBloodTest(String amka, String date) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<BloodTest> bloodtests = new ArrayList<BloodTest>();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM bloodtest WHERE amka= '" + amka + "' AND test_date='" + date + "'");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                BloodTest bt = gson.fromJson(json, BloodTest.class);
                bloodtests.add(bt);
            }
            return bloodtests;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

   
    
    public ArrayList<BloodTest> databaseToBloodTest2param(String amka, String date) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<BloodTest> bloodtests = new ArrayList<BloodTest>();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM bloodtest WHERE amka= '" + amka + "' AND test_date>='" + date + "'");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                BloodTest bt = gson.fromJson(json, BloodTest.class);
                bloodtests.add(bt);
            }
            return bloodtests;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public ArrayList<BloodTest> databaseToBloodTest3param(String amka, String date1, String date2) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<BloodTest> bloodtests = new ArrayList<BloodTest>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM bloodtest WHERE amka= '" + amka + "' AND test_date>='" + date1 + "'AND test_date<='" + date2 + "'");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                BloodTest bt = gson.fromJson(json, BloodTest.class);
                bloodtests.add(bt);
            }
            return bloodtests;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }


    public ArrayList<BloodTest> databaseToBloodTestmeasure(String amka, String measure) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<BloodTest> bloodtests = new ArrayList<BloodTest>();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM bloodtest WHERE amka= '" + amka + "' AND " + measure + "<>'" + 0 + "'");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                BloodTest bt = gson.fromJson(json, BloodTest.class);
                bloodtests.add(bt);
            }
            return bloodtests;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public ArrayList<BloodTest> databaseToBloodTestId(String bloodtest_id) throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<BloodTest> bloodtests = new ArrayList<BloodTest>();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM bloodtest WHERE bloodtest_id= '" + bloodtest_id + "'");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                BloodTest bt = gson.fromJson(json, BloodTest.class);
                bloodtests.add(bt);
            }
            return bloodtests;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    
       public void updateBloodTest(int id,double chol) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        BloodTest bt=new BloodTest();
        bt.setCholesterol(chol);
        bt.setCholesterol_level();
        String update="UPDATE bloodtest SET cholesterol='"+chol+"', cholesterol_level='"+bt.getCholesterol_level()+"' WHERE bloodtest_id = '"+id+"'";
        stmt.executeUpdate(update);
    }

    public void updateBloodTest(String id, String measure, String value) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        BloodTest bt = new BloodTest();
        double val = Double.parseDouble(value);
        String level = "";
        if (measure.equals("blood_sugar")) {
            bt.setBlood_sugar(val);
            bt.setBlood_sugar_level();
            level = bt.getBlood_sugar_level();
        } else if (measure.equals("iron")) {
            bt.setIron(val);
            bt.setIron_level();
            level = bt.getIron_level();
        } else if (measure.equals("cholesterol")) {
            bt.setCholesterol(val);
            bt.setCholesterol_level();
            level = bt.getCholesterol_level();
        } else if (measure.equals("vitamin_d3")) {
            bt.setVitamin_d3(val);
            bt.setVitamin_d3_level();
            level = bt.getVitamin_d3_level();
        } else if (measure.equals("vitamin_b12")) {
            bt.setVitamin_b12(val);
            bt.setVitamin_b12_level();
            level = bt.getVitamin_b12_level();
        }
        String update = "UPDATE bloodtest SET " + measure + "='" + value + "', " + measure + "_level='" + level + "' WHERE bloodtest_id = '" + id + "'";
        stmt.executeUpdate(update);
    }
  
       
       public void deleteBloodTest(int bloodtestid) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String deleteQuery = "DELETE FROM bloodtest WHERE bloodtest_id='" + bloodtestid + "'";
        stmt.executeUpdate(deleteQuery);
        stmt.close();
        con.close();
    }


    public void createBloodTestTable() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String sql = "CREATE TABLE bloodtest "
                + "(bloodtest_id INTEGER not NULL AUTO_INCREMENT, "
                + "amka VARCHAR (11) not null,"
                + "test_date DATE not NULL, "
                + "medical_center VARCHAR(100) not NULL, "
                + "blood_sugar DOUBLE, "
                + "blood_sugar_level VARCHAR(10),"
                + "cholesterol DOUBLE, "
                + "cholesterol_level VARCHAR(10)," 
                + "iron DOUBLE, "
                + "iron_level VARCHAR(10)," 
                + "vitamin_d3 DOUBLE, "
                + "vitamin_d3_level VARCHAR(10)," 
                + "vitamin_b12 DOUBLE, "
                + "vitamin_b12_level VARCHAR(10)," 
                + "PRIMARY KEY ( bloodtest_id ))";
        stmt.execute(sql);
        stmt.close();
        con.close();

    }

    /**
     * Establish a database connection and add in the database.
     *
     * @throws ClassNotFoundException
     */
    public void createNewBloodTest(BloodTest bt) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " bloodtest (amka,test_date,medical_center,blood_sugar,blood_sugar_level,cholesterol,"
                    + "cholesterol_level,iron,iron_level,vitamin_d3,vitamin_d3_level,vitamin_b12,vitamin_b12_level) "
                    + " VALUES ("
                    + "'" + bt.getAmka()+ "',"
                    + "'" + bt.getTest_date() + "',"
                    + "'" + bt.getMedical_center() + "',"
                    + "'" + bt.getBlood_sugar() + "',"
                    + "'" + bt.getBlood_sugar_level() + "',"
                    + "'" + bt.getCholesterol() + "',"
                    + "'" + bt.getCholesterol_level() + "',"
                    + "'" + bt.getIron() + "',"
                    + "'" + bt.getIron_level() + "',"
                    + "'" + bt.getVitamin_d3() + "',"
                    + "'" + bt.getVitamin_d3_level() + "',"
                    + "'" + bt.getVitamin_b12()+ "',"
                    + "'" + bt.getVitamin_b12_level()+ "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The bloodtest was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditBloodTestTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
