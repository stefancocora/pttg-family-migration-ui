package uk.gov.digital.ho.proving.income.family.cwtool;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/application")
public class Service {

    Client client = Client.create();

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity getTemporaryMigrationFamilyApplication(@RequestParam(value = "nino", required = false) String nino) {

        WebResource webResource = client.resource("http://localhost:8080/application?nino="+nino);
        ClientResponse response = webResource.accept("application/json")
                .get(ClientResponse.class);

        HttpHeaders headers = new HttpHeaders();

        headers.set("Content-type", "application/json");

        return new ResponseEntity<String>(response.getEntity(String.class), headers, HttpStatus.valueOf(response.getStatus()));
    }

}