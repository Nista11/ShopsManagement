package com.example.labsdi.service;

import com.example.labsdi.domain.Courier;
import com.example.labsdi.service.exception.CourierServiceException;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface ICourierService {
    boolean containsCourier(Long id);
    Courier addCourier(Courier courier) throws CourierServiceException;
    Courier getCourier(Long id) throws CourierServiceException;
    List<Courier> getFirst100Couriers();
    Slice<Courier> getCourierPage(Integer page);
    Slice<Courier> getCouriersPageByUsername(Integer page, String username);
    Slice<Courier> getCourierContainsNamePage(String name, Integer page);
    void removeCourier(Long id) throws CourierServiceException;
    Courier updateCourier(Courier courier, Long id) throws CourierServiceException;

    Integer getCount();

    List<Courier> getAllCouriers();
    Integer countByUsername(String username);
}
