package uk.gov.digital.ho.proving.income.family.cwtool.domain.client;

import uk.gov.digital.ho.proving.income.family.cwtool.domain.api.APIResponse;
import uk.gov.digital.ho.proving.income.family.cwtool.domain.api.CategoryCheck;
import uk.gov.digital.ho.proving.income.family.cwtool.domain.api.Individual;

import java.util.Objects;

/**
 * @Author Home Office Digital
 */
public class FinancialStatusResponse {
    private String status;
    private CategoryCheck categoryCheck;
    private Individual individual;

    public FinancialStatusResponse(APIResponse apiResult) {
        this.categoryCheck = apiResult.getCategoryCheck();
        this.individual = apiResult.getIndividual();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public CategoryCheck getCategoryCheck() {
        return categoryCheck;
    }

    public void setCategoryCheck(CategoryCheck categoryCheck) {
        this.categoryCheck = categoryCheck;
    }

    public Individual getIndividual() {
        return individual;
    }

    public void setIndividual(Individual individual) {
        this.individual = individual;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FinancialStatusResponse that = (FinancialStatusResponse) o;
        return Objects.equals(status, that.status) &&
                Objects.equals(categoryCheck, that.categoryCheck) &&
                Objects.equals(individual, that.individual);
    }

    @Override
    public int hashCode() {
        return Objects.hash(status, categoryCheck, individual);
    }

    @Override
    public String toString() {
        return "FinancialStatusResponse{" +
                "status='" + status + '\'' +
                ", categoryCheck=" + categoryCheck +
                ", individual=" + individual +
                '}';
    }
}
