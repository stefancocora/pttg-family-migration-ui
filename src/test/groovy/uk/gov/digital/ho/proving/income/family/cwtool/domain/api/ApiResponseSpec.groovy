package uk.gov.digital.ho.proving.income.family.cwtool.domain.api

import nl.jqno.equalsverifier.EqualsVerifier
import nl.jqno.equalsverifier.Warning
import spock.lang.Specification

/**
 * @Author Home Office Digital
 */
class ApiResponseSpec extends Specification {

    def "generates meaningful toString instead of just a hash"() {

        given:
        def instance = new ApiResponse()
        instance.setIndividual(new Individual("mr", "first", "last", "nino"))

        when:
        def output = instance.toString()

        then:
        output.contains("individual=$instance.individual")

        and:
        !output.contains('ApiResponse@')
    }

    def 'has valid hashcode and equals'() {

        when:
        EqualsVerifier.forClass(ApiResponse).suppress(Warning.NONFINAL_FIELDS).verify()

        then:
        noExceptionThrown()
    }
}
