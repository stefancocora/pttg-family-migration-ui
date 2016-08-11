package uk.gov.digital.ho.proving.income.family.cwtool.domain.client

import nl.jqno.equalsverifier.EqualsVerifier
import nl.jqno.equalsverifier.Warning
import spock.lang.Specification
import uk.gov.digital.ho.proving.income.family.cwtool.domain.api.CategoryCheck
import uk.gov.digital.ho.proving.income.family.cwtool.domain.api.Individual

/**
 * @Author Home Office Digital
 */
class FinancialStatusResponseSpec extends Specification {

    def "generates meaningful toString instead of just a hash"() {

        given:
        def instance = new FinancialStatusResponse(new CategoryCheck(), new Individual())

        when:
        def output = instance.toString()

        then:
        output.contains("categoryCheck=$instance.categoryCheck")

        and:
        !output.contains('FinancialStatusResponse@')
    }

    def 'has valid hashcode and equals'() {

        when:
        EqualsVerifier.forClass(FinancialStatusResponse).suppress(Warning.NONFINAL_FIELDS).verify()

        then:
        noExceptionThrown()
    }
}
