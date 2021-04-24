package com.llandaeta.prices.core.model;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
@Builder
public class PriceModel{

    private int brandId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int productId;
    private int priceList;
    private int priority;
    private double price;
    private String curr;

}
