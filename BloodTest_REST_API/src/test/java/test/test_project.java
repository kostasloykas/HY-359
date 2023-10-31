/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.logging.Level;
import java.util.logging.Logger;
import static org.apache.http.HttpHeaders.ACCEPT;
import org.apache.http.HttpResponse;

import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;

/**
 *
 * @author kosta
 */
public class test_project {
    private HttpClient client;
    private HttpGet alltests_amka_date;
    private HttpGet alltests_amka_measure;
    private HttpPut testsUpdate;
    private HttpDelete testsDelete;
    private HttpPost addtestService;
    private static final String URL = "http://localhost:8080/Computers_REST_API/lab/lab";
    private String serviceName;

    public test_project() {
        client = HttpClientBuilder.create().build();
    }

    public void getTestsAmkaDate(String amka, String fromDate, String toDate) throws IOException {
        try {
            serviceName = "bloodTests";
            if (fromDate == null) {
                alltests_amka_date = new HttpGet(URL + "/" + serviceName + "/" + amka);
            } else {
                if (toDate != null) {
                    alltests_amka_date = new HttpGet(URL + "/" + serviceName + "/" + amka + "?fromDate=" + fromDate + "&toDate=" + toDate);
                } else {
                    alltests_amka_date = new HttpGet(URL + "/" + serviceName + "/" + amka + "?fromDate=" + fromDate);
                }
            }
            alltests_amka_date.addHeader(ACCEPT, "application/json");
            HttpResponse response = client.execute(alltests_amka_date);
            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            String line = "";
            while ((line = rd.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            Logger.getLogger(test_project.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void getTestsAmkaMeasure(String amka, String measure) throws IOException {
        try {
            serviceName = "bloodTestMeasure";
            alltests_amka_measure = new HttpGet(URL + "/" + serviceName + "/" + amka + "/" + measure);
            alltests_amka_measure.addHeader(ACCEPT, "application/json");
            HttpResponse response = client.execute(alltests_amka_measure);
            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            String line = "";
            while ((line = rd.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            Logger.getLogger(test_project.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void addNewTest(String json) throws IOException {
        try {
            serviceName = "newBloodTest";
            addtestService = new HttpPost(URL + "/" + serviceName);
            addtestService.addHeader(ACCEPT, "application/json");
            addtestService.addHeader("content-type", "application/json");
            StringEntity toSend = new StringEntity(json);
            addtestService.setEntity(toSend);
            HttpResponse response = this.client.execute(addtestService);
            int responseCode = response.getStatusLine().getStatusCode();
            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            String line = "";
            System.out.println("Response Code: " + responseCode);
            while ((line = rd.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            Logger.getLogger(test_project.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void updateTest(String id, String measure, String value) throws IOException {
        try {
            serviceName = "bloodTest";
            testsUpdate = new HttpPut(URL + "/" + serviceName + "/" + id + "/" + measure + "/" + value);
            testsUpdate.addHeader(ACCEPT, "application/json");
            HttpResponse response = this.client.execute(testsUpdate);
            int responseCode = response.getStatusLine().getStatusCode();
            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            String line = "";
            while ((line = rd.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            Logger.getLogger(test_project.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    public void deleteTest(String id) throws IOException {
        try {
            serviceName = "bloodTestDeletion";
            testsDelete = new HttpDelete(URL + "/" + serviceName + "/" + id);
            testsDelete.addHeader(ACCEPT, "application/json");
            HttpResponse response = client.execute(testsDelete);
            int responseCode = response.getStatusLine().getStatusCode();
            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            String line = "";
            while ((line = rd.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            Logger.getLogger(test_project.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
