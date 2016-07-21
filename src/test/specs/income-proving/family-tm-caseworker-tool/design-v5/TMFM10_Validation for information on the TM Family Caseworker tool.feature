Feature: Input validation
  National Insurance Numbers (NINO) - Format and Security: A NINO is made up of two letters, six numbers and a final letter (which is always A, B, C, or D)
  Date formats: Format should be dd/mm/yyyy or d/m/yyyy

  Scenario: Caseworker does NOT enter a National Insurance Number
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When the NINO is NOT entered:
      | NINO                    |            |
      | Application Raised Date | 01/01/2015 |
    Then The service displays the following message:
      | Error Message | Please provide a National Insurance Number |
      | Error Field   | nino-error                                 |

  Scenario: Caseworker enters incorrect National Insurance Number prefixed with two characters
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When an incorrect NINO is entered:
      | NINO                    | 11123456A  |
      | Application Raised Date | 01/01/2015 |
    Then The service displays the following message:
      | Error Message | Please provide a valid National Insurance Number |
      | Error Field   | nino-error                                       |

  Scenario: Caseworker enters incorrect National Insurance Number with two characters in the middle
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When an incorrect NINO is entered:
      | NINO                    | QQ12HR56A  |
      | Application Raised Date | 01/01/2015 |
    Then The service displays the following message:
      | Error Message | Please provide a valid National Insurance Number |
      | Error Field   | nino-error                                       |

  Scenario: Caseworker enters incorrect National Insurance Number with the last digit being a number
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When an incorrect NINO is entered:
      | NINO                    | QQ1235560  |
      | Application Raised Date | 01/01/2015 |
    Then The service displays the following message:
      | Error Message | Please provide a valid National Insurance Number |
      | Error Field   | nino-error                                       |

  Scenario: Caseworker enters incorrect National Insurance Number is not 9 characters
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When an incorrect NINO is entered:
      | NINO                    | QQ12545    |
      | Application Raised Date | 01/01/2015 |
    Then The service displays the following message:
      | Error Message | Please provide a valid National Insurance Number |
      | Error Field   | nino-error                                       |

  Scenario: Caseworker enters an incorrect Application Raised Date
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When an incorrect Application Raised Date is entered:
      | NINO                    | QQ129956A  |
      | Application Raised Date | 85/01/2015 |
    Then The service displays the following message:
      | Error Message | Please provide a valid Application Raised Date |
      | Error Field   | application—raised-date-error                  |

  Scenario: Caseworker enters an incorrect Application Raised Date
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When an incorrect Application Raised Date is entered:
      | NINO                    | QQ128856A  |
      | Application Raised Date | 01/13/2015 |
    Then The service displays the following message:
      | Error Message | Please provide a valid Application Raised Date |
      | Error Field   | application—raised-date-error                  |

  Scenario: Caseworker enters an incorrect Application Raised date
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When an incorrect Application Raised Date is entered:
      | NINO                    | QQ128856A  |
      | Application Raised Date | 01/01/201k |
    Then The service displays the following message:
      | Error Message | Please provide a valid Application Raised Date |
      | Error Field   | application—raised-date-error                  |

  Scenario: Caseworker enters a blank Application Raised Date
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Application Raised Date is not entered:
      | NINO                    | QQ128856A |
      | Application Raised Date |           |
    Then The service displays the following message:
      | Error Message | Please provide an Application Raised Date |
      | Error Field   | application—raised-date-error             |

  Scenario: Caseworker is prevented from entering a future date as the Application Raised Date
    Given Caseworker is using the Income Proving Service Case Worker Tool
    When a future Application Raised Date is entered:
      | NINO                    | QQ125556A  |
      | Application Raised Date | 01/01/2017 |
    Then The service displays the following message:
      | Error Message | Please provide a valid Application Raised Date |
      | Error Field   | application—raised-date-error                  |