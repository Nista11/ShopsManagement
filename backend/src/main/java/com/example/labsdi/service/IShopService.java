package com.example.labsdi.service;

import com.example.labsdi.domain.Courier;
import com.example.labsdi.domain.Shop;
import com.example.labsdi.domain.dto.ShopAveragePriceDTO;
import com.example.labsdi.service.exception.ShopServiceException;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface IShopService {
    boolean containsShop(Long id);
    Shop addShop(Shop shop) throws ShopServiceException;
    Shop getShop(Long id) throws ShopServiceException;
    List<Shop> getFirst100Shops();
    void removeShop(Long id) throws ShopServiceException;
    Shop updateShop(Shop shop, Long id) throws ShopServiceException;
    List<Shop> getAllShops();
    Slice<Shop> getShopsPage(Integer page);
    Slice<Shop> getShopsPageByUsername(Integer page, String username);
    Slice<Shop> getShopContainsNamePage(Integer page, String name);
    List<ShopAveragePriceDTO> getAllShopsOrderByAverageProductsPrice();
    List<ShopAveragePriceDTO> getFirst100ShopsOrderByAverageProductsPrice();
    Slice<ShopAveragePriceDTO> getShopsByAveragePricePage(Integer page);
    Integer countByUsername(String username);

    Shop addCourier(Courier courier, Long id) throws ShopServiceException;

    Shop removeCourier(Long shopId, Long courierId) throws ShopServiceException;

    Integer getCount();
}
