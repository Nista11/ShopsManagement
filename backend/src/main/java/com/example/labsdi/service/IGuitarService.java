package com.example.labsdi.service;

import com.example.labsdi.domain.Guitar;
import com.example.labsdi.service.exception.GuitarServiceException;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface IGuitarService {
    boolean containsGuitar(Long id);
    Guitar addGuitar(Guitar guitar) throws GuitarServiceException;
    Guitar getGuitar(Long id) throws GuitarServiceException;
    void removeGuitar(Long id) throws GuitarServiceException;
    Guitar updateGuitar(Guitar guitar, Long id) throws GuitarServiceException;
    List<Guitar> getAllGuitars();
    List<Guitar> getFirst100Guitars();
    Slice<Guitar> getGuitarsPage(Integer page);
    Slice<Guitar> getGuitarsPageByUsername(Integer page, String username);
    Slice<Guitar> getGuitarContainsNamePage(String name, Integer page);
    List<Guitar> findByPriceGreaterThan(Integer price);
    List<Guitar> findFirst100ByPriceGreaterThan(Integer price);
    Slice<Guitar> findByPriceGreaterThanPage(Integer price, Integer page);
    Integer countGuitarsByUsername(String username);
    Integer getCount();
    void addGuitarsToShop(List<Guitar> guitars, Long id) throws GuitarServiceException;
}
