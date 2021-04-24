package com.llandaeta.prices.rest.controllers;

import com.llandaeta.prices.core.model.PriceModel;
import com.llandaeta.prices.core.services.PriceService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/api")
public class PriceController{

    private PriceService priceService;

    @GetMapping("/price")
    public PriceModel searchPriceForBrandTime(@RequestParam("brandId") int brandId,
                                              @RequestParam("productId") int productId,
                                              @RequestParam("applicationDate") String applicationDate){

        var applicationDateTime = LocalDateTime.parse(applicationDate, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        return priceService.searchPriceToApply(brandId, productId, applicationDateTime, applicationDateTime);


    }
}
