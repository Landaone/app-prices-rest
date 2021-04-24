package com.llandaeta.prices.rest.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Error{

    private final int httpcode;
    private final String message;

}