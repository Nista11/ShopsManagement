package com.example.labsdi.controller;

import com.example.labsdi.service.IAppConfigurationService;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.apache.commons.lang3.SystemUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;

@RestController
@RequestMapping("/api")
public class AdminController {
    @Autowired
    IAppConfigurationService appConfigurationService;

    @DeleteMapping("/admin/delete/all")
    public ResponseEntity<?> deleteAllRecords() {
        return executeLinuxCommand("./deleteAllRecords.exp");
    }

    @PostMapping("/admin/insert/{countPerEntity}")
    public ResponseEntity<?> insertRecords(@PathVariable("countPerEntity") @NotNull @Positive Integer countPerEntity) {
        Integer insertsAndBatches = Double.valueOf(Math.ceil(Math.sqrt(countPerEntity))).intValue();
        String command = String.format("./deleteGenerateInsert.sh %d %d", insertsAndBatches, insertsAndBatches);
        return executeLinuxCommand(command);
    }

    @PutMapping("/admin/updateEntriesPerPage/{entriesPerPage}")
    public ResponseEntity<?> updateEntriesPerPage(@PathVariable @NotNull @PositiveOrZero Long entriesPerPage) {
        try {
            return ResponseEntity.ok(appConfigurationService.updateEntriesPerPage(entriesPerPage));
        }catch (Exception ex) {
            System.out.println(ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/appConfig/entriesPerPage")
    public ResponseEntity<?> getEntriesPerPage() {
        try {
            return ResponseEntity.ok(new Object() {
                public Long getEntriesPerPage() {
                    return appConfigurationService.getFirst().getEntriesPerPage();
                }});
        }catch (Exception ex) {
            System.out.println(ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    public ResponseEntity<?> executeLinuxCommand(String command) {
        if (!SystemUtils.IS_OS_LINUX) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new Object() {
                public String getMessage() {return "Server OS is not Linux";}
            });
        }

        try {
            File workingDirectory = new File("/app/dataGeneration");
            ProcessBuilder pb = new ProcessBuilder("/bin/bash", "-c", command);
            pb.directory(workingDirectory);
            pb.redirectErrorStream(true);
            Process process = pb.start();

            int exitCode = process.waitFor();
            System.out.println("Process exited with code " + exitCode);

            if (exitCode == 0) {
                return ResponseEntity.ok(new Object() {
                    public String getMessage() {
                        return "Successful command";
                    }
                });
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Object() {
                    public String getMessage() {return "OS could not properly execute the command";}
                });
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new Object() {
                public String getMessage() {return "OS related error";}
            });
        }
    }
}
