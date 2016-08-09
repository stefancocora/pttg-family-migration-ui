package uk.gov.digital.ho.proving.income.family.cwtool.exception;

/**
 * @Author Home Office Digital
 */
public class InvalidRequestParameterException extends RuntimeException {

    private String parameterName;

    public InvalidRequestParameterException(String parameterName, String message) {
        super(message);
        this.parameterName = parameterName;
    }

    public String getParameterName() {
        return parameterName;
    }
}
