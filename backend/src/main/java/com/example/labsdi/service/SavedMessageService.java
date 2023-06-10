package com.example.labsdi.service;

import com.example.labsdi.domain.SavedMessage;
import com.example.labsdi.repository.ISavedMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SavedMessageService implements ISavedMessageService {

    @Autowired
    ISavedMessageRepository repository;

    @Override
    public SavedMessage saveMessage(SavedMessage message) {
        return repository.save(message);
    }
}
