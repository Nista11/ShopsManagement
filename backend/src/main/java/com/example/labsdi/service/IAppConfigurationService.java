package com.example.labsdi.service;

import com.example.labsdi.domain.AppConfiguration;

public interface IAppConfigurationService {
    AppConfiguration updateEntriesPerPage(Long entriesPerPage);
    AppConfiguration getFirst();
}
