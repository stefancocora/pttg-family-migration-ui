package uk.gov.digital.ho.proving.income.family.cwtool;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.retry.annotation.Retryable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import uk.gov.digital.ho.proving.income.family.cwtool.domain.api.ApiResponse;
import uk.gov.digital.ho.proving.income.family.cwtool.domain.api.Nino;
import uk.gov.digital.ho.proving.income.family.cwtool.domain.client.FinancialStatusResponse;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDate;

import static java.util.Arrays.asList;
import static org.springframework.http.HttpMethod.GET;

@RestController
@RequestMapping("/incomeproving/v1/individual/{nino}/financialstatus")
@ControllerAdvice
public class Service {

    private static Logger LOGGER = LoggerFactory.getLogger(Service.class);

    @Value("${api.root}")
    private String apiRoot;

    @Value("${api.endpoint}")
    private String apiEndpoint;

    @Autowired
    private RestTemplate restTemplate;

    ObjectMapper mapper = new ServiceConfiguration().getMapper();

    @Retryable(interceptor = "connectionExceptionInterceptor")
    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity checkStatus(@Valid Nino nino,
                                      @RequestParam(value = "applicationRaisedDate", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate applicationRaisedDate,
                                      @RequestParam(value = "dependants", required = false) Integer dependants) {

        LOGGER.debug("CheckStatus: Nino - {} applicationRaisedDate - {} dependants- {}", nino.getNino(), applicationRaisedDate, dependants);

        ApiResponse apiResult = restTemplate.exchange(buildUrl(nino.getNino(), applicationRaisedDate, dependants), GET, entity(), ApiResponse.class).getBody();

        LOGGER.debug("Api result: {}", apiResult.toString());

        FinancialStatusResponse response = new FinancialStatusResponse(apiResult);

        return ResponseEntity.ok(response);
    }

    private URI buildUrl(String nino, LocalDate applicationRaisedDate, Integer dependants) {
        return UriComponentsBuilder
                .fromUriString(apiRoot + apiEndpoint)
                .queryParam("applicationRaisedDate", applicationRaisedDate)
                .queryParam("dependants", dependants)
                .buildAndExpand(nino).toUri();
    }

    private HttpEntity<Object> entity() {
        return new HttpEntity<>(getHeaders());
    }

    private HttpHeaders getHeaders() {

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(asList(MediaType.APPLICATION_JSON));

        return headers;
    }

    public void setRestTemplate(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

}