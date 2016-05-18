Feature: Tool identifies Applicant meets Category A Financial Requirement

  National Insurance Numbers (NINO) - Format and Security: A NINO is made up of two letters, six numbers and a final letter (which is always A, B, C, or D)
  Date formats: Format should be dd/mm/yyyy or d/m/yyyy

###################################### Section - Check for text on Output does not meet Category A page ######################################

#Change scenario - Removed the Page static heading field - SD
  Scenario: Check for important text on the page

  This scenario is to check for required text on the page that explains what financial requirement check has been performed.

    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO                    | JL123456A  |
      | Application Raised Date | 15/01/2015 |
    Then The service for Cat A Failure provides the following result:
      | Page static detail  | They don't meet the financial requirement because: |

#New scenario - SD132
  Scenario: Check for important text on the page

  This scenario is to check for required text on the page that explains what needs to be done next after the check.

    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO                    | JL123456A  |
      | Application Raised Date | 15/01/2015 |
    Then The service for Cat A Failure provides the following result:
      | What to do next heading     | What to do next |
      | What to do next sub heading | You should consider if the applicant meets the financial requirement under any other category. |


###################################### Section - Check for text on Output meets Category A page ######################################

#Change scenario - Removed the Page static heading field - SD132
  Scenario: Page checks for Category A financial text write up

  This is a scenario to check for the Category A financial requirement text write up

    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO                    | AA345678A  |
      | Application Raised Date | 23/01/2015 |
    Then The IPS Family TM CW Tool output page provides the following result:
      | Page title    | Financial requirement check                                                                                                             |
      | Page sub text | Does the applicant meet the Category A: financial requirement? |

###################################### Section - Check for text on Output Category A page ######################################

  Scenario: Page checks for appendix link

  This is a scenario to check the Appendix link is present on the page

    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO                    | AA345678A  |
      | Application Raised Date | 23/01/2015 |

    Then The IPS Family TM CW Tool output page provides the following result appendix:
      | Page appendix title | Where can I find the appendix?                         |
      | Chapter 8 link      | Chapter 8 of the immigration directorate instructions. |
      | FM 1_7 link         | Appendix FM 1.7                                        |

###################################### Section - Check for text on input page ######################################

#Changed Scenario - Changed text to reflect new release of design v5 - SD132
  Scenario: Input Page checks for Category A financial text write up (1)

    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert is displayed the Income Proving Service Case Worker Tool input page:
    Then The IPS Family TM Case Worker Tool input page provides the following result:
      | Page sub title | Individual's details                                                                                                                                                           |
      | Page sub text  | You can check an individual meets the Category A requirement using a National Insurance Number. |

###################################### Section - Check for Validation on Input page ######################################

  Scenario: Caseworker does NOT enter a National Insurance Number (2)
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When the NINO is NOT entered:
      | NINO                    |            |
      | Application Raised Date | 01/01/2015 |

    Then The service displays the following message:
      | Error Message | Please provide a National Insurance Number |
      | Error Field   | nino-error                                 |

  Scenario: Caseworker enters incorrect National Insurance Number prefixed with two characters (3)
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When an incorrect NINO is entered:
      | NINO                    | 11123456A  |
      | Application Raised Date | 01/01/2015 |

    Then The service displays the following message:
      | Error Message | Please provide a valid National Insurance Number |
      | Error Field   | nino-error                                       |

  Scenario: Caseworker enters incorrect National Insurance Number with two characters in the middle (4)
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When an incorrect NINO is entered:
      | NINO                    | QQ12HR56A  |
      | Application Raised Date | 01/01/2015 |

    Then The service displays the following message:
      | Error Message | Please provide a valid National Insurance Number |
      | Error Field   | nino-error                                       |

  Scenario: Caseworker enters incorrect National Insurance Number with the last digit being a number (5)
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When an incorrect NINO is entered:
      | NINO                    | QQ1235560  |
      | Application Raised Date | 01/01/2015 |

    Then The service displays the following message:
      | Error Message | Please provide a valid National Insurance Number |
      | Error Field   | nino-error                                       |

  Scenario: Caseworker enters incorrect National Insurance Number is not 9 characters (6)
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When an incorrect NINO is entered:
      | NINO                    | QQ12545    |
      | Application Raised Date | 01/01/2015 |

    Then The service displays the following message:
      | Error Message | Please provide a valid National Insurance Number |
      | Error Field   | nino-error                                       |

  Scenario: Caseworker enters an incorrect Application Raised Date (7)
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Application Raised Date is not entered:
      | NINO                    | QQ129956A  |
      | Application Raised Date | 85/01/2015 |

    Then The service displays the following message:
      | Error Message | Please provide a valid Application Raised Date |
      | Error Field   | application—raised-date-error                  |

  Scenario: Caseworker enters an incorrect Application Raised Date (8)
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Application Raised Date is not entered:
      | NINO                    | QQ128856A  |
      | Application Raised Date | 01/13/2015 |

    Then The service displays the following message:
      | Error Message | Please provide a valid Application Raised Date |
      | Error Field   | application—raised-date-error                  |

  Scenario: Caseworker enters an incorrect Application Raised date (9)
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When an incorrect Application Raised Date is entered:
      | NINO                    | QQ128856A  |
      | Application Raised Date | 01/01/201k |

    Then The service displays the following message:
      | Error Message | Please provide a valid Application Raised Date |
      | Error Field   | application—raised-date-error                  |

#New scenaio - Added in
  Scenario: Caseworker enters a blank Application Raised Date
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Application Raised Date is not entered:
      | NINO                    | QQ128856A  |
      | Application Raised Date |            |
    Then The service displays the following message:
      | Error Message | Please provide an Application Raised Date |
      | Error Field   | application—raised-date-error             |
