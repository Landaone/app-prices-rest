package com.llandaeta.prices.core.services.impl;

import com.llandaeta.prices.core.model.PriceModel;
import com.llandaeta.prices.core.services.PriceService;
import com.llandaeta.prices.db.entities.PriceEntity;
import com.llandaeta.prices.db.repositories.PriceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doReturn;

@SpringBootTest
class PriceServiceImplTest{

    @Autowired
    private PriceService priceService;

    @MockBean
    private PriceRepository priceRepository;

    int brandId;
    int productId;
    PriceEntity price;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @BeforeEach
    public void init(){

        this.brandId = 1;
        this.productId = 1;
        this.startDate = LocalDateTime.of(2020, 06, 14, 10, 00, 00);
        this.endDate = LocalDateTime.of(2020, 12, 31, 23, 59, 59);

        this.price = PriceEntity.builder()
                .brandId(1)
                .productId(1)
                .startDate(startDate)
                .endDate(endDate)
                .priceList(1)
                .priority(1)
                .price(35.5)
                .curr("EUR")
                .build();
    }

    @Test
    void testSearchPriceToApply(){

        doReturn(Optional.of(this.price))
                .when(priceRepository).findFirstByBrandIdAndProductIdAndStartDateIsLessThanEqualAndEndDateGreaterThanEqualOrderByPriorityDesc(this.brandId, this.productId, this.startDate, this.startDate);

        PriceModel returned = priceService.searchPriceToApply(this.brandId, this.productId, this.startDate, this.startDate);

        assertEquals(1, returned.getBrandId());
        assertEquals(1, returned.getProductId());
        assertTrue(startDate.isEqual(returned.getStartDate()));
        assertTrue(endDate.isEqual(returned.getEndDate()));
        assertEquals(35.5, returned.getPrice());
        assertEquals("EUR", returned.getCurr());

    }

}