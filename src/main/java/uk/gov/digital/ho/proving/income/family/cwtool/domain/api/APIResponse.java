package uk.gov.digital.ho.proving.income.family.cwtool.domain.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.Objects;

@JsonIgnoreProperties(ignoreUnknown = true)
public class APIResponse implements Serializable {
    private Individual individual;
    private CategoryCheck categoryCheck;

    public APIResponse() {
    }

    public Individual getIndividual() {
        return individual;
    }

    public void setIndividual(Individual individual) {
        this.individual = individual;
    }

    public CategoryCheck getCategoryCheck() {
        return categoryCheck;
    }

    public void setCategoryCheck(CategoryCheck categoryCheck) {
        this.categoryCheck = categoryCheck;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        APIResponse that = (APIResponse) o;
        return Objects.equals(individual, that.individual) &&
                Objects.equals(categoryCheck, that.categoryCheck);
    }

    @Override
    public int hashCode() {
        return Objects.hash(individual, categoryCheck);
    }

    @Override
    public String toString() {
        return "APIResponse{" +
                "individual=" + individual +
                ", categoryCheck=" + categoryCheck +
                '}';
    }
}
