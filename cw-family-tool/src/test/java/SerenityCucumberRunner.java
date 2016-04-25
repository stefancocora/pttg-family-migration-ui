import cucumber.api.*;
import net.serenitybdd.cucumber.*;
import org.junit.runner.*;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(features={"specs/income-proving/family-tm-caseworker-tool/design-v3"} ,tags = {"@SD63, @SD41, @SD64, @SD65"})

public class SerenityCucumberRunner {
}
