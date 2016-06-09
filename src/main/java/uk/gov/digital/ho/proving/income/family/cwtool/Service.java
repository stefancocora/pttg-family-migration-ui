package uk.gov.digital.ho.proving.income.family.cwtool;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/incomeproving/v1/individual/{nino}/financialstatus")
public class Service {

    private static Logger LOGGER = LoggerFactory.getLogger(Service.class);

    private Client client = Client.create();

    @Value("${remote.server.port}")
    private String remotePort;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity getMigrationFamilyApplication(
            @PathVariable(value = "nino") String nino,
            @RequestParam(value = "applicationRaisedDate", required = true) String applicationDateAsString,
            @RequestParam(value = "dependants", required = false) Integer dependants) {


        String url = "http://pttg-income-proving-api:"+ remotePort + "/incomeproving/v1//individual/" + nino + "/financialstatus?applicationRaisedDate=" + applicationDateAsString;
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

    private ResponseEntity<ResponseStatus> buildErrorResponse(HttpHeaders headers, String errorCode, String errorMessage, HttpStatus status) {
        ResponseStatus response = new ResponseStatus(errorCode, errorMessage);
        return new ResponseEntity<>(response, headers, status);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public Object missingParamterHandler(MissingServletRequestParameterException exception) {
        LOGGER.debug(exception.getMessage());
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-type", "application/json");
        return buildErrorResponse(headers, "0008", "Missing parameter: " + exception.getParameterName() , HttpStatus.BAD_REQUEST);
    }

}