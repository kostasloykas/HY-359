/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


/**
 * REST Web Service
 *
 * @author mountant
 */
@Path("lab")
public class LaptopsAPI {

    @POST
    @Path("/newBloodTest")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response new_blood_test(String data) throws ClassNotFoundException, SQLException {
        System.out.println(data);
        EditBloodTestTable table = new EditBloodTestTable();
        BloodTest test = table.jsonToBloodTest(data);

        if (table.databaseToBloodTest(test.getAmka(), test.getTest_date()).isEmpty()) {
            table.addBloodTestFromJSON(data);
            return Response.status(Response.Status.OK).type("application/json").entity("{\"success\":\"Test Added\"}").build();
        }

        return Response.status(Response.Status.CONFLICT).type("application/json").entity("{\"error\":\"Test Exists\"}").build();
    }


    @GET
    @Path("/bloodTests/{amka}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response test(@PathParam("amka") String amka, @QueryParam("fromDate") String fromDate, @QueryParam("toDate") String toDate) throws SQLException, ClassNotFoundException {
        EditBloodTestTable table = new EditBloodTestTable();
        ArrayList<BloodTest> list_bloodtests;

        if (fromDate == null) {
            list_bloodtests = table.databaseToBloodTest1param(amka);
            if (list_bloodtests.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST).type("application/json").entity("{\"error\":\"Amka doesn't Exists\"}").build();
            }
        } else {
            if (toDate == null) {
                list_bloodtests = table.databaseToBloodTest2param(amka, fromDate);
            } else {
                list_bloodtests = table.databaseToBloodTest3param(amka, fromDate, toDate);
            }
        }
        String json = new Gson().toJson(list_bloodtests);

        return Response.status(Response.Status.OK).type("application/json").entity(json).build();
    }

    @GET
    @Path("/bloodTestMeasure/{amka}/{measure}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response test_measure(@PathParam("amka") String amka, @PathParam("measure") String measure) throws ClassNotFoundException, SQLException {
        EditBloodTestTable table = new EditBloodTestTable();
        ArrayList<BloodTest> list_bloodtests = table.databaseToBloodTest1param(amka);

        if (list_bloodtests.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).type("application/json").entity("{\"error\":\"AMKA doesn't Exists\"}").build();
        }
        list_bloodtests = table.databaseToBloodTestmeasure(amka, measure);

        if (list_bloodtests.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).type("application/json").entity("{\"error\":\"There is no measure=" + measure + " for AMKA \"}").build();
        }

        String json = new Gson().toJson(list_bloodtests);

        return Response.status(Response.Status.OK).type("application/json").entity(json).build();
    }

    @PUT
    @Path("/bloodTest/{bloodTestID}/{measure}/{value}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response update_test(@PathParam("bloodTestID") String bloodTestID, @PathParam("measure") String measure, @PathParam("value") String value) throws ClassNotFoundException, SQLException {
        EditBloodTestTable table = new EditBloodTestTable();
        ArrayList<BloodTest> list_bloodtests = table.databaseToBloodTestId(bloodTestID);

        if (list_bloodtests.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).type("application/json").entity("{\"error\":\"ID doesn't Exists\"}").build();
        }
        table.updateBloodTest(bloodTestID, measure, value);

        return Response.status(Response.Status.OK).type("application/json").entity("{\"success\":\"Update\"}").build();
    }

    @DELETE
    @Path("/bloodTestDeletion/{bloodTestID}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response delete_test(@PathParam("bloodTestID") String bloodTestID) throws ClassNotFoundException, SQLException {
        EditBloodTestTable table = new EditBloodTestTable();
        ArrayList<BloodTest> list_bloodtests = table.databaseToBloodTestId(bloodTestID);

        if (list_bloodtests.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).type("application/json").entity("{\"error\":\"ID doesn't Exists\"}").build();
        }
        int id = Integer.parseInt(bloodTestID);
        table.deleteBloodTest(id);
        return Response.status(Response.Status.OK).type("application/json").entity("{\"success\":\"Delete\"}").build();
    }


}
