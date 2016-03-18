package uk.gov.digital.ho.proving.income.family.cwtool;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

import static org.springframework.boot.SpringApplication.run;

@SpringBootApplication
public class ServiceRunner  {

    //@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ServiceRunner.class);
    }

    public static void main(String[] args) throws Exception {
        run(ServiceRunner.class, args);
    }

}
