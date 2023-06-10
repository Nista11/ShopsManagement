package com.example.labsdi.service;

import com.example.labsdi.domain.AppConfiguration;
import com.example.labsdi.repository.IAppConfigurationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppConfigurationService implements IAppConfigurationService {
    @Autowired
    IAppConfigurationRepository repository;

    @Override
    public AppConfiguration updateEntriesPerPage(Long entriesPerPage) {
        AppConfiguration appConfig = repository.count() > 0 ? repository.findAll().get(0) : new AppConfiguration();
        appConfig.setEntriesPerPage(entriesPerPage);
        return repository.save(appConfig);
    }

    @Override
    public AppConfiguration getFirst() {
        return repository.findAll().get(0);
    }
}
