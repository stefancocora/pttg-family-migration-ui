package steps

import cucumber.api.DataTable
import cucumber.api.Scenario
import cucumber.api.java.After
import cucumber.api.java.Before
import cucumber.api.java.en.Given
import cucumber.api.java.en.Then
import cucumber.api.java.en.When
import net.thucydides.core.annotations.Managed
import org.apache.commons.lang3.StringUtils
import org.apache.commons.lang3.text.WordUtils
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.IntegrationTest
import org.springframework.boot.test.SpringApplicationConfiguration
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.web.WebAppConfiguration
import uk.gov.digital.ho.proving.income.family.cwtool.ServiceRunner

import java.text.SimpleDateFormat

@SpringApplicationConfiguration(ServiceRunner.class)
@WebAppConfiguration
@IntegrationTest
@ActiveProfiles("test")
class ProvingThingsTestSteps {

    def static rootUrl = "http://localhost:8001/"

    def incomeUriRegex = "/incomeproving/v1/individual/nino/financialstatus"

    def testDataLoader

    @Value('${wiremock}')
    private Boolean wiremock;

    @Managed
    public WebDriver driver;
    private int delay = 1

    @Before
    def setUp(Scenario scenario) {
        if (wiremock) {
            testDataLoader = new WireMockTestDataLoader()
        }
    }

    @After
    def tearDown() {
        testDataLoader?.stop()
    }

    def String toCamelCase(String s) {
        String allUpper = StringUtils.remove(WordUtils.capitalizeFully(s), " ")
        String camelCase = allUpper[0].toLowerCase() + allUpper.substring(1)
        camelCase
    }

    def parseDate(String dateString) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy")
        Date date = sdf.parse(dateString)
        date
    }

    def sendKeys(WebElement element, String v) {
        element.clear();
        if (v != null && v.length() != 0) {
            element.sendKeys(v);
        }
    }

    public void submitForm(Map<String, String> entries, WebDriver driver) {
        entries.each { k, v ->
            String key = toCamelCase(k)

            if (key.endsWith("Date")) {
                if (v != null && v.length() != 0) {

                    String day = v.substring(0, v.indexOf("/"))
                    String month = v.substring(v.indexOf("/") + 1, v.lastIndexOf("/"))
                    String year = v.substring(v.lastIndexOf("/") + 1)

                    sendKeys(driver.findElement(By.id(key + "Day")), day)
                    sendKeys(driver.findElement(By.id(key + "Month")), month)
                    sendKeys(driver.findElement(By.id(key + "Year")), year)

                } else {
                    driver.findElement(By.id(key + "Day")).clear()
                    driver.findElement(By.id(key + "Month")).clear()
                    driver.findElement(By.id(key + "Year")).clear()
                }
            } else {
                sendKeys(driver.findElement(By.id(key)), v)
            }
        }
    }

    public void checkOutput(Map<String, String> entries, WebDriver driver) {
        entries.each { k, v ->
            String key = toCamelCase(k)

            if (key != "outcome") {
                assert v.equals(driver.findElement(By.id(key)).getText())
            } else {
                WebElement element = driver.findElement(By.id(key))
                String cssValue = element.getAttribute("class")
                assert cssValue.contains("panel-fail") == false
            }
        }
    }

    @Given("^the account data for (.*)\$")
    def the_account_data_for(String nino) {
        testDataLoader.stubTestData(nino, incomeUriRegex.replaceFirst("nino", nino))
    }

    @Given("^no record for (.*)\$")
    def no_record_for(String nino) {
        testDataLoader.stubErrorData("notfound", incomeUriRegex.replaceFirst("nino", nino), 404)
    }

    @Given("^Caseworker is using the Income Proving Service Case Worker Tool\$")
    public void caseworker_is_using_the_Income_Proving_Service_Case_Worker_Tool() throws Throwable {
        driver.get(rootUrl);
        driver.manage().deleteAllCookies()
    }

    @When("^Robert submits a query to IPS Family TM Case Worker Tool:\$")
    public void robert_submits_a_query_to_ips_family_tm_case_worker_tool(DataTable arg1) {
        submitFormWithData(arg1)
    }

    @When("^Robert is displayed the Income Proving Service Case Worker Tool input page:\$")
    public void robert_is_displayed_the_Income_Proving_Service_Case_Worker_Tool_input_page() {
        // SD65 This method is empty because the validation (in the Then function) is done on the input page opened in the Given function
    }

    @When("^Robert submits a query:\$")
    public void robert_submits_a_query(DataTable arg1) {
        submitFormWithData(arg1)
    }

    @When("^the NINO is NOT entered:\$")
    public void the_nino_is_not_entered(DataTable arg1) {
        submitFormWithData(arg1)
    }

    @When("^an incorrect NINO is entered:\$")
    public void an_incorrect_nino_is_eneterd(DataTable arg1) {
        submitFormWithData(arg1)
    }

    @When("^Application Raised Date is not entered:\$")
    public void application_raised_date_missing(DataTable arg1) {
        submitFormWithData(arg1)
    }

    @When("^(?:a future|an incorrect) Application Raised Date is entered:\$")
    public void application_raised_date_wrong(DataTable arg1) {
        submitFormWithData(arg1)
    }


    @Then("^The service displays the following message:\$")
    public void the_service_displays_the_following_message(DataTable arg1) {
        Map<String, String> entries = arg1.asMap(String.class, String.class)
        assert driver.findElement(By.id(entries.get("Error Field"))).getText() == entries.get("Error Message")
    }

    @Then("^The IPS Family TM Case Worker Tool provides the following result:\$")
    public void the_ips_family_tm_case_worker_tool_provides_the_following_results(DataTable expectedResult) {

        Map<String, String> entries = expectedResult.asMap(String.class, String.class)
        String[] outcome = entries.keySet()

        for (String s : outcome) {
            if (s != "Outcome") {
                String elementId = toCamelCase(s)
                WebElement element = driver.findElement(By.id(elementId))
                assert element.getText().contains(entries.get(s))

            } else {
                String elementId = toCamelCase(s)
                WebElement element = driver.findElement(By.id(elementId))
                String cssValue = element.getAttribute("class")
                assert cssValue.contains("panel-fail") == false
            }
        }
    }


    @Then("^The IPS Family TM CW Tool output page provides the following result:\$")
    public void the_IPS_Family_TM_CW_Tool_output_page_provides_the_following_result(DataTable expectedResult) {
        Map<String, String> entries = expectedResult.asMap(String.class, String.class)

        entries.each{ k, v ->

            def elementText = driver.findElement(By.id(toCamelCase(k))).getText()
            assert elementText.contains(v)
        }
    }

    @Then("^The IPS Family TM CW Tool output page provides the following result appendix:\$")
    public void the_IPS_Family_TM_CW_Tool_output_page_provides_the_following_result_appendix(DataTable expectedResult) {
        Map<String, String> entries = expectedResult.asMap(String.class, String.class)
        checkOutput(entries, driver)
    }

    @Then("^The service for Cat A Failure provides the following result:\$")
    public void the_service_for_Cat_A_Failure_provides_the_following_result(DataTable expectedResult) {
        Map<String, String> entries = expectedResult.asMap(String.class, String.class)
        checkOutput(entries, driver)
    }


    @Then("^The service provides the following NINO does not exist result:\$")
    public void the_service_provides_the_following_NINO_does_not_exist_result(DataTable expectedResult) {
        Map<String, String> entries = expectedResult.asMap(String.class, String.class)
        checkOutput(entries, driver)
    }

    @Then("^The IPS Family TM Case Worker Tool input page provides the following result:\$")
    public void the_IPS_Family_TM_Case_Worker_Tool_input_page_provides_the_following_result(DataTable expectedResult) {
        Map<String, String> entries = expectedResult.asMap(String.class, String.class)
        checkOutput(entries, driver)
    }

    @When("^Robert submits a query to IPS Family TM Case Worker Tool \\(with dependants\\):\$")
    public void robert_submits_a_query_to_IPS_Family_TM_Case_Worker_Tool_with_dependants(DataTable expectedResult) {
        Map<String, String> entries = expectedResult.asMap(String.class, String.class)
        driver.sleep(delay)
        submitForm(entries, driver)
        driver.findElement(By.className("button")).click();
    }

    @Then("^The IPS Family TM Case Worker Tool provides the following error result \\(with dependants\\):\$")
    public void the_IPS_Family_TM_Case_Worker_Tool_provides_the_following_error_result_with_dependants(DataTable expectedResult) {
        Map<String, String> entries = expectedResult.asMap(String.class, String.class)
        checkOutput(entries, driver)
    }


    @Then("^The IPS Family TM Case Worker Tool provides the following result - with dependants:\$")
    public void the_IPS_Family_TM_Case_Worker_Tool_provides_the_following_result_with_dependants(DataTable expectedResult) {
        println expectedResult
        Map<String, String> entries = expectedResult.asMap(String.class, String.class)
        checkOutput(entries, driver)
    }

    private void submitFormWithData(DataTable arg1) {
        Map<String, String> entries = arg1.asMap(String.class, String.class)
        submitForm(entries, driver);
        driver.findElement(By.className("button")).click();
    }
}