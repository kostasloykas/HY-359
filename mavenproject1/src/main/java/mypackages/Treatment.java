/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package mypackages;

/**
 *
 * @author loukas
 */
public class Treatment {
    int treatment_id;
    int doctor_id;
    int user_id;
    String start_date;
    String end_date;
    String treatment_text;
    int bloodtest_id;

    public int getTreatment_id() {
        return treatment_id;
    }

    public void setTreatment_id(int treatment_id) {
        this.treatment_id = treatment_id;
    }

    public int getDoctor_id() {
        return doctor_id;
    }

    public void setDoctor_id(int doctor_id) {
        this.doctor_id = doctor_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public String getTreatment_text() {
        return treatment_text;
    }

    public void setTreatment_text(String treatment_text) {
        this.treatment_text = treatment_text;
    }

    public int getBloodtest_id() {
        return bloodtest_id;
    }

    public void setBloodtest_id(int bloodtest_id) {
        this.bloodtest_id = bloodtest_id;
    }



}
