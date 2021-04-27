package com.llandaeta.prices.core.services;

import com.llandaeta.prices.core.model.PriceModel;

import java.time.LocalDateTime;
import java.util.List;

public interface PriceService{

    PriceModel searchPriceToApply(int brandId, int productId, LocalDateTime startDate, LocalDateTime endDate);

}
