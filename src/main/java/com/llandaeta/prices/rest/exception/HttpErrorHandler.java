package com.llandaeta.prices.rest.exception;

import com.llandaeta.prices.core.exception.HttpException;
import com.llandaeta.prices.rest.dto.Error;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class HttpErrorHandler{

    @ExceptionHandler(HttpException.class)
    public ResponseEntity<Error> handleHttpError(HttpException httpException){
        return ResponseEntity.status(httpException.getHttpStatus())
                .body(Error.builder()
                        .httpcode(httpException.getHttpStatus().value())
                        .message(httpException.getMessage())
                        .build());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Error> unhandledExceptions(HttpException exception){
        log.error("unhandled exception", exception);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Error.builder()
                        .httpcode(500)
                        .message(exception.getMessage())
                        .build());
    }
}
