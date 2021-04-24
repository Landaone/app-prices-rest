package com.llandaeta.prices.core.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class HttpException extends RuntimeException{

    private final HttpStatus httpStatus;

    public HttpException(HttpStatus httpStatus, String message){
        super(message);
        this.httpStatus = httpStatus != null ? httpStatus : HttpStatus.INTERNAL_SERVER_ERROR;
    }
}