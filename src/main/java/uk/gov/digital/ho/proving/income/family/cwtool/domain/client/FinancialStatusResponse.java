package uk.gov.digital.ho.proving.income.family.cwtool.domain.client;

import uk.gov.digital.ho.proving.income.family.cwtool.domain.api.ApiResponse;
import uk.gov.digital.ho.proving.income.family.cwtool.domain.api.CategoryCheck;
import uk.gov.digital.ho.proving.income.family.cwtool.domain.api.Individual;

import java.util.Objects;

/**
 * @Author Home Office Digital
 */
public final class FinancialStatusResponse {
    private CategoryCheck categoryCheck;
    private Individual individual;

    public FinancialStatusResponse(ApiResponse apiResult) {
        this.categoryCheck = apiResult.getCategoryCheck();
        this.individual = apiResult.getIndividual();
    }

    public FinancialStatusResponse(CategoryCheck categoryCheck, Individual individual) {
        this.categoryCheck = categoryCheck;
        this.individual = individual;
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
        return Objects.equals(categoryCheck, that.categoryCheck) &&
                Objects.equals(individual, that.individual);
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryCheck, individual);
    }

    @Override
    public String toString() {
        return "FinancialStatusResponse{" +
                "categoryCheck=" + categoryCheck +
                ", individual=" + individual +
                '}';
    }
}
