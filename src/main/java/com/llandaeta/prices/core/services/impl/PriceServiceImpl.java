package com.llandaeta.prices.core.services.impl;

import com.llandaeta.prices.core.converters.PriceEntityModelConverter;
import com.llandaeta.prices.core.exception.NoPriceFoundException;
import com.llandaeta.prices.core.model.PriceModel;
import com.llandaeta.prices.core.services.PriceService;
import com.llandaeta.prices.db.entities.PriceEntity;
import com.llandaeta.prices.db.repositories.PriceRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class PriceServiceImpl implements PriceService{

    private final PriceRepository priceRepository;
    private final PriceEntityModelConverter priceEntityModelConverter;

    @Override
    public PriceModel searchPriceToApply(final int brandId, final int productId, final LocalDateTime startDate, final LocalDateTime endDate){
        Optional<PriceEntity> optionalPrice = priceRepository.findFirstByBrandIdAndProductIdAndStartDateIsLessThanEqualAndEndDateGreaterThanEqualOrderByPriorityDesc(brandId, productId, startDate, endDate);

        return optionalPrice
                .map(priceEntityModelConverter::convert)
                .orElseThrow(() -> new NoPriceFoundException("No  price found to the brand"));
    }
}