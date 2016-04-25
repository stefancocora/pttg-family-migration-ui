/**
 * Created by andrewmoores on 19/02/2016.
 */


import org.openqa.selenium.By
import org.openqa.selenium.OutputType
import org.openqa.selenium.TakesScreenshot
import org.openqa.selenium.WebElement
import org.openqa.selenium.phantomjs.PhantomJSDriver
import org.openqa.selenium.remote.DesiredCapabilities
import spock.lang.Ignore
import spock.lang.Specification


class BrowserTest extends Specification {

    @Ignore
    def "test with google" () {

        when:

        DesiredCapabilities capabilities = DesiredCapabilities.phantomjs();
        PhantomJSDriver driver = new PhantomJSDriver(capabilities);
        driver.get("http://localhost:8000/income-proving-tool.html");

        driver.findElement(By.id('nino')).sendKeys("qwerty")

        then:

        WebElement button = driver.findElement(By.name('search'))

        assert button != null

        button.click()

        File srcFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        println("File:" + srcFile);

        def dst = new File('target/screen.png')
        dst << srcFile.bytes


        assert driver.findElement(By.xpath('//*[@id=\"content\"]/div[2]')).displayed

    }

}
