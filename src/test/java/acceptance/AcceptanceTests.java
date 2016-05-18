package acceptance;

import cucumber.api.*;
import net.serenitybdd.cucumber.*;
import org.junit.runner.*;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(features={"src/test/specs/income-proving/family-tm-caseworker-tool/design-v5"}
        , glue={"steps"}
        //,tags = {"@SD108_Tool_identifies_Applicant_Does_Not_Meet_CAT_A_Req_No_Dependent," +
      //  "@SD102-Tool_identifies_Applicant_Meets_CAT_A_Dependent," +
      //  "@SD102-Tool_identifies_Applicant_Does_Not_Meet_CAT_A_Dependent," +
     //   "@SD108-Tool_Identifies_applicant_meets_CAT_A_Financial_Requirement_(with_no_dependents-monthly_pay)," +
     //   "@SD108_Nino_Does_Not_Exist," +
    //    "@SD108_Validation_For_Information_on_the_TM_CWT"}
)

public class AcceptanceTests {
}
