package com.llandaeta.prices.core.converters;

import com.llandaeta.prices.core.model.PriceModel;
import com.llandaeta.prices.db.entities.PriceEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class PriceEntityModelConverterTest{

    private static final int ONE = 1;
    private static final int PRODUCT_ID = 35455;
    private static final int ZERO = 0;
    private static final double PRICE = 35.5;
    private static final String CURRENCY = "EUR";

    @Autowired
    PriceEntityModelConverter priceEntityModelConverter;

    private PriceEntity priceEntity;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @BeforeEach
    void setUp(){

        this.startDate = LocalDateTime.of(2020, 06, 14, 10, 00, 00);
        this.endDate = LocalDateTime.of(2020, 12, 31, 23, 59, 59);

        this.priceEntity = PriceEntity.builder()
                .brandId(ONE)
                .startDate(startDate)
                .endDate(endDate)
                .productId(PRODUCT_ID)
                .priceList(ONE)
                .priority(ZERO)
                .price(PRICE)
                .curr(CURRENCY)
                .build();

    }

    @Test
    void convert(){

        PriceModel priceModel= priceEntityModelConverter.convert(this.priceEntity);

        assertNotNull(priceModel);
        assertEquals(ONE, priceModel.getBrandId());
        assertTrue(startDate.isEqual(priceModel.getStartDate()));
        assertTrue(endDate.isEqual(priceModel.getEndDate()));
        assertEquals(PRODUCT_ID, priceModel.getProductId());
        assertEquals(ONE, priceModel.getPriceList());
        assertEquals(ZERO, priceModel.getPriority());
        assertEquals(PRICE, priceModel.getPrice());
        assertEquals(CURRENCY, priceModel.getCurr());
    }

}