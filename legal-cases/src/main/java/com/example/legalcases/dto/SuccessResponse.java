package com.example.legalcases.dto;

public class SuccessResponse {

    private String detail;

    public SuccessResponse(String detail) {
        this.detail = detail;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
}
