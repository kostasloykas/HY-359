/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package test;

import java.io.IOException;

/**
 *
 * @author kosta
 */
public class main {
    public static void main(String[] args) throws IOException {
        test_project rs = new test_project();

        String json = "{\n"
                + " \"amka\":\"05039900310\","
                + " \"test_date\":\"2021-12-10\","
                + " \"medical_center\": \"pagni\","
                + " \"blood_sugar\": \"150\","
                + " \"iron\": \"300\""
                + "}";
        System.out.println("Add New Test");
        rs.addNewTest(json);

        json = "{\n"
                + " \"amka\":\"05039900310\","
                + " \"test_date\":\"2021-05-10\","
                + " \"medical_center\": \"pagni\","
                + " \"blood_sugar\": \"200\","
                + " \"iron\": \"200\""
                + "}";
        System.out.println("Add New Test");
        rs.addNewTest(json);


        System.out.println("All Tests for amka=05039900310 from date 2021-06-10");
        rs.getTestsAmkaDate("05039900310", "2021-06-10", null);

        System.out.println("All Test for amka=05039900310 with blood_sugar measure");
        rs.getTestsAmkaMeasure("05039900310", "blood_sugar");

        System.out.println("Update Test for id=14 cholesterol=500");
        rs.updateTest("14", "cholesterol", "500");

        System.out.println("Print Again Test for amka=05039900310 and measure=cholesterol");
        rs.getTestsAmkaMeasure("05039900310", "cholesterol");

        System.out.println("Delete Laptop with id=14");
        rs.deleteTest("14");

        System.out.println("Print Again Test for amka=05039900310 and measure=blood_sugar");
        rs.getTestsAmkaMeasure("05039900310", "blood_sugar");

    }

}
