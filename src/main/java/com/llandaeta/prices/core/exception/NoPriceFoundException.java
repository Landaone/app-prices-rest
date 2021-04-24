package com.llandaeta.prices.core.exception;

public class NoPriceFoundException extends NotFoundException{
    public NoPriceFoundException(String message){
        super(message);
    }
}
