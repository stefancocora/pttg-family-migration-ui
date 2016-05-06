Feature: Failure - Category A Financial Requirement (with dependents - monthly pay)

  Requirement to meet Category A
  Applicant or Sponsor has been paid for < 6 consecutive months with the same employer

  Financial income regulation to pass this Feature File
  Income required amount no dependent child = £18600 (£1550 per month or above for EACH of the previous 6 months from the Application Raised Date)
  Additional funds for 1 dependent child = £3800 on top of employment threshold
  Additional funds for EVERY subsequent dependent child = £2400 on top of employment threshold per child TEST

  Financial income calculation to pass this Feature File
  Income required amount + 1 dependent amount + (Additional dependent amount * number of dependents)/12 = Gross Monthly Income is < in any one of the 6 months prior to the Application Raised Date

  1 dependent child - £18600+£3800/12 = £1866.67
  2 dependent children - £18600+£3800+£2400/12 = £2066.67
  3 dependent children - £18600+£3800+(£2400*2)/12 = £2266.67
  4 dependent children - £18600+£3800+(£2400*3)/12 = £2466.67
  5 dependent children - £18600+£3800+(£2400*4)/12 = £2666.67
  7 dependent children - £18600+£3800+(£2400*6)/12 = £3066.67
  ETC

#New scenario - Added in SD102
  Scenario: Shelly does not meet the Category A Financial Requirement (She has earned < the Cat A financial threshold)

  Pay date 15th of the month
  Before day of Application Raised Date
  She has 4 Canadian dependants
  She earns £2250.00 Monthly Gross Income EVERY of the 6 months prior to the Application Raised Date

    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool (with dependants):
      | NINO                    | SP123456B  |
      | Application Raised Date | 03/02/2015 |
      | Dependants              | 4          |
    Then The IPS Family TM Case Worker Tool provides the following error result (with dependants):
      | Page dynamic heading                  | Shelly Patel doesn't meet the Category A salaried requirement |
      | Category A check failure reason       | they haven't met the required amount.                 |

      | Your Search Individual Name           | Shelly Patel                                                  |
      | Your Search Dependants                | 4                                                             |
      | Your Search National Insurance Number | SP123456B                                                     |
      | Your Search Application Raised Date   | 03/02/2015                                                    |

#New scenario - Added in SD102
  Scenario: Brian does not meet the Category A Financial Requirement (He has earned < the Cat A financial threshold)

  Pay date 10th of the month
  On the same day of Application Raised Date
  He has 2 Thai dependants
  He earns £1416.67 Monthly Gross Income EVERY of the 6 months prior to the Application Raised Date

    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool (with dependants):
      | NINO                    | BS123456B  |
      | Application Raised Date | 10/02/2015 |
      | Dependants              | 2          |
    Then The IPS Family TM Case Worker Tool provides the following error result (with dependants):
      | Page dynamic heading                  | Brian Sinclair doesn't meet the Category A salaried requirement |
      | Category A check failure reason       | they haven't met the required amount.                   |

      | Your Search Individual Name           | Brian Sinclair                                                  |
      | Your Search Dependants                | 2                                                               |
      | Your Search National Insurance Number | BS123456B                                                       |
      | Your Search Application Raised Date   | 10/02/2015                                                      |

#New scenario - Added in SD102
  Scenario: Steve does not meet the Category A employment duration Requirement (He has worked for his current employer for only 5 months)

  Pay date 3rd of the month
  On same day of Application Raised Date
  He has 3 Thai dependants
  He earns £2916.67 Monthly Gross Income BUT for only 5 months prior to the Application Received Date
  He worked for a different employer before his current employer

    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool (with dependants):
      | NINO                    | SY987654C  |
      | Application Raised Date | 03/09/2015 |
      | Dependants              | 3          |
    Then The IPS Family TM Case Worker Tool provides the following error result (with dependants):
      | Page dynamic heading                  | Steve Yu doesn't meet the Category A salaried requirement   |
      | Category A check failure reason       | they haven't been with their current employer for 6 months. |

      | Your Search Individual Name           | Steve Yu                                                    |
      | Your Search Dependants                | 3                                                           |
      | Your Search National Insurance Number | SY987654C                                                   |
      | Your Search Application Raised Date   | 03/09/2015                                                  |

#New scenario - Added in SD102
  Scenario: Scarlett Jones does not meets the Category A Financial Requirement with 3 dependants

  Pay date 2nd of the month
  Before day of Application Raised Date
  He earns £3333.33 Monthly Gross Income EVERY of the 6 months prior to the Application Received Date
  He has 3 dependants child

    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool (with dependants):
      | NINO                    | SJ123456C |
      | Application Raised Date | 3/1/2016  |
      | Dependants              | 3         |
    Then The IPS Family TM Case Worker Tool provides the following error result (with dependants):
      | Page dynamic heading                  | Scarlett Jones doesn't meet the Category A salaried requirement |
      | Category A check failure reason       | they haven't been with their current employer for 6 months.     |

      | Your Search Individual Name           | Scarlett Jones                                                  |
      | Your Search Dependants                | 3                                                               |
      | Your Search National Insurance Number | SJ123456C                                                       |
      | Your Search Application Raised Date   | 03/01/2016                                                      |
