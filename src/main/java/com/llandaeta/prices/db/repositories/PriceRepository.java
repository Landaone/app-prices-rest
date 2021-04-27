package com.llandaeta.prices.db.repositories;

import com.llandaeta.prices.db.entities.PriceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface PriceRepository extends JpaRepository<PriceEntity, Long>{

    Optional<PriceEntity> findFirstByBrandIdAndProductIdAndStartDateIsLessThanEqualAndEndDateGreaterThanEqualOrderByPriorityDesc(int brandId, int productId, LocalDateTime startDate, LocalDateTime endDate);
   }
