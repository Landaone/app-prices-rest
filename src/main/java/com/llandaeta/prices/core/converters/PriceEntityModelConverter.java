package com.llandaeta.prices.core.converters;

import com.llandaeta.prices.core.model.PriceModel;
import com.llandaeta.prices.db.entities.PriceEntity;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class PriceEntityModelConverter implements Converter<PriceEntity, PriceModel>{

    @Override
    public PriceModel convert(PriceEntity priceEntity){

        return PriceModel.builder()
                .brandId(priceEntity.getBrandId())
                .startDate(priceEntity.getStartDate())
                .endDate(priceEntity.getEndDate())
                .priceList(priceEntity.getPriceList())
                .productId(priceEntity.getProductId())
                .priority(priceEntity.getPriority())
                .price(priceEntity.getPrice())
                .curr(priceEntity.getCurr())
                .build();
    }
}
