package uk.gov.digital.ho.proving.income.family.cwtool

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.IntegrationTest
import org.springframework.boot.test.SpringApplicationConfiguration
import org.springframework.boot.test.TestRestTemplate
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.web.client.RestTemplate
import spock.lang.Specification
import spock.lang.Timeout
import uk.gov.digital.ho.proving.income.family.cwtool.domain.ResponseDetails

import static java.util.concurrent.TimeUnit.SECONDS

/**
 * @Author Home Office Digital
 */
@SpringApplicationConfiguration(classes = ServiceRunner.class)
@WebAppConfiguration
@IntegrationTest("server.port:0")
@TestPropertySource(properties = [
        "api.root=http://10.255.255.1",
        "rest.connection.connect-timeout=500",
        "connectionRetryDelay=500",
        "connectionAttemptCount=2"
])
class ServiceConnTimeoutIntegrationSpec extends Specification {

    @Value('${local.server.port}')
    def port

    def path = "/incomeproving/v1/individual/AA121212A/financialstatus?"
    def params = "applicationRaisedDate=2014-12-01&dependants=0"
    def url

    RestTemplate restTemplate


    def setup() {
        restTemplate = new TestRestTemplate()
        url = "http://localhost:" + port + path + params
    }

    @Timeout(value = 4, unit = SECONDS)
    def 'obeys timeout on slow connection response'() {

        given:
        // we have set the api host to an unresolvable address, which means that the rest call to the API won't return
        // we have also set the connect-timeout property to 1/2 second

        when:
        def entity = restTemplate.getForEntity(url, ResponseDetails.class)

        then:
        entity.getBody().message.contains("connect timed out")
        // If the connection timeout settings aren't being obeyed, then this test will fail when the @Timeout is exceeded
    }


}
