package com.example.legalcases.model;

public class Case {

    private String petitioner;
    private String respondent;
    private String dateOfJudgment;
    private String bench;
    private String citation;
    private String citatorInfo;
    private String judgment;

    // Getters and Setters
    public String getPetitioner() {
        return petitioner;
    }

    public void setPetitioner(String petitioner) {
        this.petitioner = petitioner;
    }

    public String getRespondent() {
        return respondent;
    }

    public void setRespondent(String respondent) {
        this.respondent = respondent;
    }

    public String getDateOfJudgment() {
        return dateOfJudgment;
    }

    public void setDateOfJudgment(String dateOfJudgment) {
        this.dateOfJudgment = dateOfJudgment;
    }

    public String getBench() {
        return bench;
    }

    public void setBench(String bench) {
        this.bench = bench;
    }

    public String getCitation() {
        return citation;
    }

    public void setCitation(String citation) {
        this.citation = citation;
    }

    public String getCitatorInfo() {
        return citatorInfo;
    }

    public void setCitatorInfo(String citatorInfo) {
        this.citatorInfo = citatorInfo;
    }

    public String getJudgment() {
        return judgment;
    }

    public void setJudgment(String judgment) {
        this.judgment = judgment;
    }
}
