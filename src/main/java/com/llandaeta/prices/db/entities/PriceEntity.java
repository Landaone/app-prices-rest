package com.llandaeta.prices.db.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "prices", schema = "test")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PriceEntity{

    @Id
    private Long id;

    @Column(name = "BRAND_ID")
    private int brandId;

    @Column(name = "START_DATE")
    private LocalDateTime startDate;

    @Column(name = "END_DATE")
    private LocalDateTime endDate;

    @Column(name = "PRODUCT_ID")
    private int productId;

    @Column(name = "PRICE_LIST")
    private int priceList;

    @Column(name = "PRIORITY")
    private int priority;

    @Column(name = "PRICE")
    private double price;

    @Column(name = "CURR")
    private String curr;
}
