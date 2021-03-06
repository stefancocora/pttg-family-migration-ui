@SD41
Feature: Tool identifies Applicant does not meet the Category A Financial Requirement

		Requirement to meet Category A
			Applicant or Sponsor has been paid for 6 consecutive months with the same employer

		Financial employment income regulation to pass this Feature File
			Applicant or Sponsor has earned < £1550 Gross Income in any one of the 6 months prior to the Application Received Date

  Scenario: Check for important text on the page

		This scenario is to check for required text on the page that explains what financial requirement check has been performed.

    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO      | JL123456A  |
      | Application received date | 15/01/2015 |
    Then The service for Cat A Failure provides the following result:
		| Page static heading | This was checked using the financial requirement ‘Category A: With current employer for 6 months or more – person residing in the UK’. |
		| Page static detail | They don't meet the financial requirement because: |

  Scenario: Jill does not meet the Category A Financial Requirement (She has earned < the Cat A financial threshold)

		Pay date 15th of the month
		Before day of Application Received Date
		She earns £1000 Monthly Gross Income EVERY of the 6 months prior to the Application Received Date

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO      | JL123456A  |
      | Application received date | 15/01/2015 |
    Then The service for Cat A Failure provides the following result:
		| Page dynamic heading |Jill Lewondoski doesn't meet the Category A requirement |
		| Category A check failure reason | they haven't met the required monthly amount. |

		| Your Search Individual Name | Jill Lewondoski |
		| Your Search National Insurance Number | JL123456A | 
		| Your Search Application Received Date | 15/01/2015 |


  Scenario: Francois does not meet the Category A Financial Requirement (He has earned < the Cat A financial threshold)

		Pay date 28th of the month 
		After day of application received date
		He earns £1250 Monthly Gross Income EVERY of the 6 months prior to the Application Received Date

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO      | FL123456B  |
      | Application received date | 28/03/2015 |
    Then The service for Cat A Failure provides the following result:
		| Page dynamic heading |Francois Leblanc doesn't meet the Category A requirement |
		| Category A check failure reason | they haven't met the required monthly amount. |

		| Your Search Individual Name | Francois Leblanc |
		| Your Search National Insurance Number | FL123456B | 
		| Your Search Application Received Date | 28/03/2015 |

  Scenario: Kumar does not meet the Category A employment duration Requirement (He has worked for his current employer for only 3 months)

		Pay date 3rd of the month
		On same day of application received date
		He earns £1600 Monthly Gross Income BUT for only 3 months prior to the Application Received Date
			He worked for a different employer before his current employer

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO      | KS123456C  |
      | Application received date | 03/07/2015 |
    Then The service for Cat A Failure provides the following result:
		| Page dynamic heading |Kumar Sangakkara Dilshan doesn't meet the Category A requirement|
		| Category A check failure reason | they haven't been with their current employer for 6 months.. |

		| Your Search Individual Name | Kumar Sangakkara Dilshan |
		| Your Search National Insurance Number | KS123456C | 
		| Your Search Application Received Date | 03/07/2015 |