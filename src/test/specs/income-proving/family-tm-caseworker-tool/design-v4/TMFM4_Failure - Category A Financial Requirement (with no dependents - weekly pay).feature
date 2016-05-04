Feature: Failure - Category A Financial Requirement (with no dependents - weekly pay)

		Requirement to meet Category A
			Applicant or Sponsor has received < 26 payments from the same employer over 182 day period prior to the Application Raised Date

		Financial employment income regulation to pass this Feature File
			Applicant or Sponsor has received 26 weekly Gross Income payments of < £357.69 in the 182 day period prior to the Application Raised Date

#New Scenario - SD105
  Scenario: Davina Love does not meet the Category A Financial Requirement (She has earned < the Cat A financial threshold)

		Pay date 15th of the month
		Before day of Application raised Date
		She earns £300.11 weekly Gross Income EVERY of the 26 weeks prior to the Application Raised Date

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query:
      | NINO      | DV123456A  |
      | Application raised Date | 15/01/2015 |
    Then The service for Cat A Failure provides the following result:
		| Page dynamic heading | Davina Love doesn't meet the Category A requirement |
		| Category A check failure reason | they haven't met the required amount. |

		| Your Search Individual Name | Davina Love |
		| Your Search National Insurance Number | DV123456A |
		| Your Search Application raised Date | 15/01/2015 |

#New Scenario - SD105
  Scenario: Xavier Snow does not meet the Category A Financial Requirement (She has earned < the Cat A financial threshold)

		Pay date 15th of the month
		Before day of Application raised Date
		He earns £30.99 weekly Gross Income EVERY of the 26 weeks prior to the Application Raised Date

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query:
      | NINO      | XS123456B  |
      | Application raised Date | 15/01/2015 |
    Then The service for Cat A Failure provides the following result:
		| Page dynamic heading | Xavier Snow doesn't meet the Category A requirement |
		| Category A check failure reason | they haven't met the required amount. |

		| Your Search Individual Name | Xavier Snow |
		| Your Search National Insurance Number | XS123456B |
		| Your Search Application raised Date | 15/01/2015 |

#New Scenario - SD SD105
  Scenario: Paul Young does not meet the Category A Financial Requirement (He has earned < the Cat A financial threshold)

		Pay date 15th of the month
		Before day of Application raised Date
		He earns £400.99 weekly Gross Income EVERY of the 24 weeks prior to the Application Raised Date
		And he earns £300.99 weekly Gross Income for the LAST 2 weeks prior to the Application Raised Date  (total 26 weeks with the same employer)

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query:
      | NINO      | XS123456B  |
      | Application raised Date | 15/01/2015 |
    Then The service for Cat A Failure provides the following result:
		| Page dynamic heading | Paul Young doesn't meet the Category A requirement |
		| Category A check failure reason | they haven't met the required amount. |

		| Your Search Individual Name | Paul Young |
		| Your Search National Insurance Number | XS123456B |
		| Your Search Application raised Date | 15/01/2015 |

#New Scenario - SD SD105
  Scenario: Raj Patel does not meet the Category A employment duration Requirement (He has worked for his current employer for only 3 months)

		Pay date 3rd of the month
		On same day of application raised date
		He earns £600 a Week Gross Income BUT for only 12 weeks prior to the Application raised Date
			He worked for a different employer before his current employer

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query:
      | NINO      | RP123456C  |
      | Application raised date | 03/07/2015 |
    Then The service for Cat A Failure provides the following result:
		| Page dynamic heading | Raj Patel doesn't meet the Category A requirement|
		| Category A check failure reason | they haven't been with their current employer for 6 months. |

		| Your Search Individual Name | Raj Patel |
		| Your Search National Insurance Number | RP123456C |
		| Your Search Application raised Date | 03/07/2015 |
