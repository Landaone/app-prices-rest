package com.llandaeta.prices.core.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class NotFoundException extends HttpException{
    public NotFoundException(String message){
        super(HttpStatus.NOT_FOUND, message);
    }
}
