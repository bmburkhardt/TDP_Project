package com.example.goat.scannertest;

import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.MalformedURLException;
import java.net.HttpURLConnection;


import com.google.zxing.Result;

import org.json.JSONObject;
import org.json.JSONException;

import me.dm7.barcodescanner.zxing.ZXingScannerView;

public class qrScanner extends AppCompatActivity implements ZXingScannerView.ResultHandler{
    private ZXingScannerView zxScan;
    public EditText mEdit;
    private String eventID;
    private String Url;
    private URL webAddress;
    private String startUrl = "http://ec2-18-216-8-189.us-east-2.compute.amazonaws.com/api/conventions/";
    private String endUrl = "/registrantArr";
    private int maxLength = 24;
    private int alreadyScanning;
    private HttpURLConnection connection;


    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_qr_scanner);

        mEdit   = (EditText)findViewById(R.id.edittext1);
    }

    public void checkField(View view){
        System.out.println("inside checkField\neventID: ");
        System.out.println(mEdit.getText().toString());

        if(mEdit.getText().toString().length() == maxLength){
            eventID = mEdit.getText().toString();
            try {
                Url = startUrl + eventID + endUrl;
                webAddress = new URL(Url);
                //tryConnect();
                //new runConnection().doInBackground(Url);
            }
            catch (MalformedURLException e) {
                System.out.println("URL CREATION FAILED");
            }
            scan(view);
        }

        else {
            System.out.println(mEdit.getText().toString());
        }

    }

    public void scan(View view){
        zxScan = new ZXingScannerView(getApplicationContext());
        setContentView(zxScan);
        zxScan.setResultHandler(this);
        zxScan.startCamera();
    }

    //pause the app when closed, close camera if it is open
    protected void onPause() {
        super.onPause();
        if(zxScan != null) {
            zxScan.stopCamera();
            alreadyScanning = 1;
        }
        else
            alreadyScanning = 0;
    }
    @Override
    protected void onPostResume(){
        super.onPostResume();
        System.out.println("we are in resume");
        if(zxScan != null)
            zxScan.startCamera();
    }
    @Override
    public void handleResult(Result result) {
        System.out.println("WE ARE IN HANDLERESULT");
        String scannedID = result.getText();
        //String url = eventID + scannedID;
        //use this to display our pass or failed message
        System.out.println("length =" + scannedID.length());

        if(scannedID.length() != maxLength) {
            Toast.makeText(getApplicationContext(), "Invalid Code", Toast.LENGTH_SHORT).show();
        }
        else {
            new runConnection().execute(Url, scannedID);
            //int i = sendToServer(scannedID);
            int i = 200;
            if (i == 200) {
                System.out.println("SUCCESS");
                Toast.makeText(getApplicationContext(), "Success", Toast.LENGTH_SHORT).show();
            } else {
                System.out.println("Failed");
                Toast.makeText(getApplicationContext(), "Invalid Code " + i, Toast.LENGTH_SHORT).show();
            }
        }
        System.out.println(scannedID);
        zxScan.resumeCameraPreview(this);
    }
    /*public int sendToServer(String personID){
        JSONObject toPost = new JSONObject();
        System.out.println(personID + "\nconnecting to url:" + Url);
        OutputStreamWriter oWriter;
        try {
            connection.connect();
            System.out.println("before creating output stream");

            oWriter = new OutputStreamWriter(connection.getOutputStream());
        }
        catch(IOException e){
            System.out.println("failed to connect");
            Toast.makeText(getApplicationContext(), "Failed to Connect", Toast.LENGTH_SHORT).show();
            return 0;
        }
        try {
            toPost.put("attend", "true");
            toPost.put("personId", personID);
        }
        catch (JSONException e) {
            return 0;
        }
        try {
            oWriter.write(toPost.toString());
        }
        catch(IOException e){
            System.out.println("Failed to send request");
            return 0;
        }
        try{
            int HttpResult = connection.getResponseCode();
        }
        catch(IOException e){
            System.out.println("failed to receive ok message");
            return 0;
        }
        return 200;
    }
*/
    /*private boolean tryConnect(){

        try {
            Url = startUrl + eventID + endUrl;
            webAddress = new URL(Url);
        }
        catch (MalformedURLException e) {
            System.out.println("URL CREATION FAILED");
            return false;
        }
        try {
            connection = (HttpURLConnection) webAddress.openConnection();
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setDoInput(true);
        }
        catch(IOException e){
            System.out.println("FAILED");
            return false;
        }
        return true;
    }*/

}
class runConnection extends AsyncTask<String, Void, String>

{
    @Override
    protected String doInBackground(String... args) {
        System.out.println(args[0] + "-------------------------------");
        URL webAddress;
        HttpURLConnection connection;
        try {
            webAddress = new URL(args[0]);
            System.out.println(webAddress.toString() + "---------------this is our URL");
            connection = (HttpURLConnection) webAddress.openConnection();
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setChunkedStreamingMode(0);
        }
        catch(IOException e){
            System.out.println("FAILED");
            return "failed";
        }
        /*catch (MalformedURLException e) {
            System.out.println("URL CREATION FAILED");
            return "failed";
        }
        catch(IOException e){
            System.out.println("failed to connect");
            //Toast.makeText(getApplicationContext(), "Failed to Connect", Toast.LENGTH_SHORT).show();
            return "0";
        }
        *
        try {
            connection = (HttpURLConnection) webAddress.openConnection();
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setDoInput(true);
        }
        catch(IOException e){
            System.out.println("FAILED");
            return "failed";
        }
        */
        JSONObject toPost = new JSONObject();
        //System.out.println(personID + "\nconnecting to url:" + Url);
        OutputStreamWriter oWriter;
        /*try {
            //connection.connect();
            System.out.println("before creating output stream");

        }
        catch(IOException e){
            System.out.println("failed to connect");
            //Toast.makeText(getApplicationContext(), "Failed to Connect", Toast.LENGTH_SHORT).show();
            return "0";
        }
        */
        try {
            String temp = args[1];
            toPost.put("register", false);
            toPost.put("attend", true);
            toPost.put("personId", temp);
        }
        catch (JSONException e) {
            System.out.println("FAILED IN JSON");
            return "0";
        }
        try {
            oWriter = new OutputStreamWriter(connection.getOutputStream());
            System.out.println("post = " + toPost.toString());
            oWriter.write(toPost.toString());
            System.out.println("WE GOT PAST THE WRITE");

        }
        catch(IOException e){
            System.out.println("Failed to send request");
            return "0";
        }
        try{
            int HttpResult = connection.getResponseCode();
            System.out.println("Http Result = " + HttpResult);
        }
        catch(IOException e){
            System.out.println("failed to receive ok message");
            return "0";
        }
        return "0";

    }

    protected void onPreExecute() {
        System.out.println("we're in thread");

    }




    protected void onPostExecute(Void result) {
        /*System.out.println(args[0] + "-------------------------------");
        URL webAddress;
        HttpURLConnection connection;
        try {
            webAddress = new URL(args[0]);
            System.out.println(webAddress.toString() + "---------------this is our URL");
            connection = (HttpURLConnection) webAddress.openConnection();
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setDoInput(true);
        }
        catch(IOException e){
            System.out.println("FAILED");
            return "failed";
        }
        /*catch (MalformedURLException e) {
            System.out.println("URL CREATION FAILED");
            return "failed";
        }
        catch(IOException e){
            System.out.println("failed to connect");
            //Toast.makeText(getApplicationContext(), "Failed to Connect", Toast.LENGTH_SHORT).show();
            return "0";
        }
        *
        try {
            connection = (HttpURLConnection) webAddress.openConnection();
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setDoInput(true);
        }
        catch(IOException e){
            System.out.println("FAILED");
            return "failed";
        }

        JSONObject toPost = new JSONObject();
        //System.out.println(personID + "\nconnecting to url:" + Url);
        OutputStreamWriter oWriter;
        try {
            //connection.connect();
            System.out.println("before creating output stream");

            oWriter = new OutputStreamWriter(connection.getOutputStream());
        }
        catch(IOException e){
            System.out.println("failed to connect");
            //Toast.makeText(getApplicationContext(), "Failed to Connect", Toast.LENGTH_SHORT).show();
            return "0";
        }
        try {
            toPost.put("attend", "true");
            toPost.put("personId", args[1]);
        }
        catch (JSONException e) {
            return "0";
        }
        try {
            oWriter.write(toPost.toString());
        }
        catch(IOException e){
            System.out.println("Failed to send request");
            return "0";
        }
        try{
            int HttpResult = connection.getResponseCode();
        }
        catch(IOException e){
            System.out.println("failed to receive ok message");
            return "0";
        }
        return "0";
        *
        */
        System.out.println("we are out of thread");

    }
}