package acceptance;

import cucumber.api.*;
import net.serenitybdd.cucumber.*;
import org.junit.runner.*;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(features={"src/test/specs/income-proving/family-tm-caseworker-tool/design-v4"}
        , glue={"steps"}
        ,tags = {"@SD102-Tool_identifies_Applicant_Does_Not_Neet_CAT_A_Dependent"}
)

public class AcceptanceTests {
}
