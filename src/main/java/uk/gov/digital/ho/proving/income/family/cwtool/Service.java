package uk.gov.digital.ho.proving.income.family.cwtool;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static Logger LOGGER = LoggerFactory.getLogger(Service.class);

    private Client client = Client.create();

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity getMigrationFamilyApplication(@RequestParam(value = "nino") String nino,
                                                        @RequestParam(value = "applicationRaisedDate") String applicationRaisedDate,
                                                        @RequestParam(value = "dependants",required = false) String dependants) {

        String remotePort = System.getProperty("remote.server.port", "8081");

        String url = "http://localhost:"+ remotePort + "/application?nino=" + nino + "&applicationRaisedDate=" + applicationRaisedDate;
        if  (dependants != null) {
            url += "&dependants="+ dependants;
        }

        LOGGER.info("Remote url: " + url);

        WebResource webResource = client.resource(url);

        client.setConnectTimeout(10000);

        ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-type", "application/json");
        return new ResponseEntity<>(response.getEntity(String.class), headers, HttpStatus.valueOf(response.getStatus()));
    }

}