package steps

import cucumber.api.DataTable
import cucumber.api.java.en.Given
import cucumber.api.java.en.Then
import cucumber.api.java.en.When
import net.thucydides.core.annotations.Managed
import org.apache.commons.lang3.StringUtils
import org.apache.commons.lang3.text.WordUtils
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement

import java.text.SimpleDateFormat

class ProvingThingsTestSteps {
    @Managed
    public WebDriver driver;

    private int delay = 1000

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

    public String camelCase(String tableKey){

        StringBuilder sbr = new StringBuilder()
        String firstString
        String nextString
        String finalString
        char firstChar

        String[] keys = tableKey.split(" ")

        for(int e = 0; e < keys.length; e++ ){

            if(e == 0) {
                firstString = keys[0].toLowerCase()
                sbr.append(firstString)
            }

            if (e > 0){
                nextString = keys[e].toLowerCase()
                firstChar = nextString.charAt(0)
                nextString = nextString.replaceFirst(firstChar.toString(), firstChar.toString().toUpperCase())
                sbr.append(nextString)
            }

            finalString = sbr.toString()
        }
        return finalString

    }

    public void submitForm(Map<String, String> entries, WebDriver driver) {
        entries.each { k, v ->
            String key = toCamelCase(k)

            println("*** ==> " + key + " " + key + " " + v)

            if (key.endsWith("Date")) {
                if (v != null && v.length() != 0) {

                    String day = v.substring(0, v.indexOf("/"))
                    String month = v.substring(v.indexOf("/")+1, v.lastIndexOf("/"))
                    String year = v.substring(v.lastIndexOf("/")+1)

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
            println(v + " === " + driver.findElement(By.id(key)).getText())

            if (key != "outcome") {
                assert v.equals(driver.findElement(By.id(key)).getText())
            } else {
                WebElement element = driver.findElement(By.id(key))
                String cssValue = element.getAttribute("class")
                assert cssValue.contains("panel-fail") == false
            }
        }
    }


    // ---------------------------------------
    // Income Proving Service Case Worker Tool
    // ---------------------------------------

    @Given("^Robert is using the IPS Generic Tool\$")
    public void robert_is_using_the_ips_generic_tool() {
        driver.get("http://localhost:8001/income-proving-tool.html");
    }

// SD65 This method is empty because the validation (in the Then function) is done on the input page opened in the Given function
    @When("^Robert is displayed the Income Proving Service Case Worker Tool input page:\$")
    public void robert_is_displayed_the_Income_Proving_Service_Case_Worker_Tool_input_page() {
// SD65 This method is empty because the validation (in the Then function) is done on the input page opened in the Given function
    }

    @When("^Robert submits a query:\$")
    public void robert_submits_a_query(DataTable arg1) {

        Map<String, String> entries = arg1.asMap(String.class, String.class)



        submitForm(entries, driver);

        driver.sleep(delay)
        driver.findElement(By.className("button")).click();

    }

    @When("^the NINO is NOT entered:\$")
    public void the_nino_is_not_entered(DataTable arg1) {

        driver.sleep(delay)

        Map<String, String> entries = arg1.asMap(String.class, String.class)


        submitForm(entries, driver);

        driver.findElement(By.xpath(".//*[@id='page1']/form/div/div[4]/p/input")).click()

        driver.findElement(By.className("button")).click();
    }

    @When("^an incorrect NINO is entered:\$")
    public void an_incorrect_nino_is_eneterd(DataTable arg1) {

        driver.sleep(delay)

        Map<String, String> entries = arg1.asMap(String.class, String.class)



        submitForm(entries, driver);

        driver.findElement(By.xpath(".//*[@id='page1']/form/div/div[4]/p/input")).click()

        driver.findElement(By.className("button")).click();
    }

    @When("^Application Raised Date is not entered:\$")
    public void application_raised_date_not_entered(DataTable arg1) {

        driver.sleep(delay)

        Map<String, String> entries = arg1.asMap(String.class, String.class)



        submitForm(entries, driver);

        driver.findElement(By.xpath(".//*[@id='page1']/form/div/div[4]/p/input")).click()

        //driver.findElement(By.className("button")).click();
    }

    @When("^an incorrect Application Raised Date is entered:\$")
    public void an_incorrent_raised_date_is_entered(DataTable arg1) {

        driver.sleep(delay)

        Map<String, String> entries = arg1.asMap(String.class, String.class)



        submitForm(entries, driver);

        driver.findElement(By.xpath(".//*[@id='page1']/form/div/div[4]/p/input")).click()

        //driver.findElement(By.className("button")).click();
    }

    @Then("^The service provides the following result:\$")
    public void the_service_provides_the_following_results(DataTable expectedResult) {

        for (int i = 0; i < expectedResult.raw().size() - 1; i++) {
            String row = expectedResult.raw.get(i)
            String[] column_data = row.split(",")

            driver.sleep(delay)

            def dateXpath = '//*[@id="page2"]/table[2]/tbody[1]/tr[' + (i + 1) + ']/td[1]'

            assert column_data[0].contains(driver.findElement(By.xpath(dateXpath)).getText())
            println "dateXpath: " + driver.findElement(By.xpath(dateXpath)).getText()

            def amountXpath = '//*[@id="page2"]/table[2]/tbody[1]/tr[' + (i + 1) + ']/td[3]'

            assert column_data[2].contains(driver.findElement(By.xpath(amountXpath)).getText())
            println "amountXpath :" + driver.findElement(By.xpath(amountXpath)).getText()
        }

        // Result row
        String result_row = expectedResult.raw.get(expectedResult.raw().size() - 1)
        String[] result_columns = result_row.split(",")

        assert result_columns[0].contains(driver.findElement(By.xpath('//*[@id="page2"]/table/tbody[2]/tr/td[1]/span')).getText())
        println "result column: " + result_columns[0]
        assert result_columns[2].contains(driver.findElement(By.xpath('//*[@id="page2"]/table/tbody[2]/tr/td[3]/span')).getText())
        println "result column_2: " + result_columns[2]
    }

    @Then("^The service displays the following message:\$")
    public void the_service_displays_the_following_message(DataTable arg1) {

        if (driver.currentUrl == "http://localhost:8001/income-proving-tool.html") {
            Map<String, String> entries = arg1.asMap(String.class, String.class)
            driver.sleep(delay)
            assert driver.findElement(By.id(entries.get("Error Field"))).getText() == entries.get("Error Message")
        } else if (driver.currentUrl.startsWith("http://localhost:8000/")) {
            Map<String, String> entries = arg1.asMap(String.class, String.class)
            driver.sleep(delay)
            assert driver.findElement(By.id(entries.get("Error Field"))).getText() == entries.get("Error Message")
        } else {
            assert false
        }
    }

    @Then("^The service provides the following Your search results:\$")
    public void the_service_provides_the_following_Your_search_results(DataTable expectedResult) throws Throwable {

        Map<String, String> entries = expectedResult.asMap(String.class, String.class)
        String[] tableKey = entries.keySet()

        WebElement yourSearchIndividualName = driver.findElement(By.id("yourSearchIndividualName"))
        WebElement yourSearchNationalInsuranceNumber = driver.findElement(By.id("yourSearchNationalInsuranceNumber"))
        WebElement yourSearchFromDate = driver.findElement(By.id("yourSearchFromDate"))
        WebElement yourSearchToDate = driver.findElement(By.id("yourSearchToDate"))


        for (String s : tableKey) {

                if (s == "Your Search Individual Name") {
                    assert entries.get(s).contains(yourSearchIndividualName.getText())
                    println "Your Search Individual Name: " + yourSearchIndividualName.getText()
                }

                if(s == "Your Search National Insurance Number"){
                    assert entries.get(s).contains(yourSearchNationalInsuranceNumber.getText())
                    println "Your Search National Insurance Number:  " + yourSearchNationalInsuranceNumber.getText()
                }

               if(s == "Your Search From Date"){
                   assert entries.get(s).contains(yourSearchFromDate.getText())
                   println "Your Search From Date: " + yourSearchFromDate.getText()

                }

            if(s == "Your Search To Date"){
                assert entries.get(s).contains(yourSearchToDate.getText())
                println "Your Search To Date: " + yourSearchToDate.getText()

            }


        }

    }


    // ------------------------------
    // IPS Family TM Case Worker Tool
    // ------------------------------
    @Given("^Caseworker is using the Income Proving Service Case Worker Tool\$")
    public void caseworker_is_using_the_Income_Proving_Service_Case_Worker_Tool() throws Throwable {
        driver.get("http://localhost:8000/");
        driver.manage().deleteAllCookies()
    }


    @When("^Robert submits a query to IPS Family TM Case Worker Tool:\$")
    public void robert_submits_a_query_to_ips_family_tm_case_worker_tool(DataTable arg1) {
        Map<String, String> entries = arg1.asMap(String.class, String.class)

        driver.sleep(delay)



        submitForm(entries, driver);

        //button click
        driver.findElement(By.xpath(".//*[@id='page1']/form/div/div[4]/p/input")).click()

        //driver.findElement(By.className("button")).click();
    }

    @Then("^The IPS Family TM Case Worker Tool provides the following result:\$")
    public void the_ips_family_tm_case_worker_tool_provides_the_following_results(DataTable expectedResult) {
        //driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS)

        Map<String, String> entries = expectedResult.asMap(String.class, String.class)
        String[] outcome = entries.keySet()

        // To manually take a screenshot
        // net.serenitybdd.core.Serenity.takeScreenshot()

        for (String s : outcome) {
            if (s != "Outcome") {
                String elementId = toCamelCase(s)
                WebElement element = driver.findElement(By.id(elementId))

                String elementText = element.getText()
                String compareTo = entries.get(s)
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

        String[] tableValue = entries.keySet()

//Page checks for Category A financial text write up SD64
        driver.sleep(delay)
        WebElement pageTitle = driver.findElement(By.className("form-title"))


        if (pageTitle.getText() == entries.get("Page title")) {

            assert true

            println " " + entries.get("Page title")

        } else assert false


        WebElement pageSubText = driver.findElement(By.className("lede"))

        assert pageSubText.getText() == entries.get("Page sub text")


    }

    //Page checks for appendix link - SD64
    @Then("^The IPS Family TM CW Tool output page provides the following result appendix:\$")
    public void the_IPS_Family_TM_CW_Tool_output_page_provides_the_following_result_appendix(DataTable expectedResult) {

        Map<String, String> entries = expectedResult.asMap(String.class, String.class)

        checkOutput(entries, driver)
    }



//SD41
    @Then("^The service for Cat A Failure provides the following result:\$")
    public void the_service_for_Cat_A_Failure_provides_the_following_result(DataTable expectedResult) {
        driver.sleep(delay)
        Map<String, String> entries = expectedResult.asMap(String.class, String.class)
        checkOutput(entries, driver)
       // String[] tableKey = entries.keySet()

     //   for (String s : tableKey) {
      //      driver.sleep(delay)
      //      assert entries.get(s).equals(driver.findElement(By.id(camelCase(s))).getText())

       // }
    }

//SD63
    @Then("^The service provides the following NINO does not exist result:\$")
    public void the_service_provides_the_following_NINO_does_not_exist_result(DataTable expectedResult) {
        Map<String, String> entries = expectedResult.asMap(String.class, String.class)

        checkOutput(entries, driver)

    }
// SD65
    @Then("^The IPS Family TM Case Worker Tool input page provides the following result:\$")
    public void the_IPS_Family_TM_Case_Worker_Tool_input_page_provides_the_following_result(DataTable expectedResult) {

        Map<String, String> entries = expectedResult.asMap(String.class, String.class)

        checkOutput(entries, driver)

    }

//Dependants
//Robert submits a query to IPS Family TM Case Worker Tool (with dependants):
    @When("^Robert submits a query to IPS Family TM Case Worker Tool \\(with dependants\\):\$")
    public void robert_submits_a_query_to_IPS_Family_TM_Case_Worker_Tool_with_dependants(DataTable expectedResult) {
        Map<String, String> entries = expectedResult.asMap(String.class, String.class)

        driver.sleep(delay)


        submitForm(entries, driver)

        driver.findElement(By.xpath(".//*[@id='page1']/form/div/div[4]/p/input")).click()

        //driver.sleep(delay)
        //driver.findElement(By.className("button")).click();

    }

    @Then("^The IPS Family TM Case Worker Tool provides the following error result \\(with dependants\\):\$")
    public void the_IPS_Family_TM_Case_Worker_Tool_provides_the_following_error_result_with_dependants(DataTable expectedResult) {

        Map<String, String> entries = expectedResult.asMap(String.class, String.class)



        checkOutput(entries, driver)
    }


    @Then("^The IPS Family TM Case Worker Tool provides the following result - with dependants:\$")
    public void the_IPS_Family_TM_Case_Worker_Tool_provides_the_following_result_with_dependants(DataTable expectedResult)  {

        println expectedResult

        Map<String, String> entries = expectedResult.asMap(String.class, String.class)


        checkOutput(entries, driver)

    }


}