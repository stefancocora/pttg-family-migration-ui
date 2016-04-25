@SD64
Feature: Changes to 'Tool identifies Applicant meets Category A Financial'

		Requirement to meet Category A
			Applicant or Sponsor has been paid for 6 consecutive months with the same employer

		Financial employment income regulation to pass this Feature File
			Applicant or Sponsor has earned => £1550 Monthly Gross Income EVERY of the 6 months prior to the Application Received Date

# New scenario
  Scenario: Page checks for Category A financial text write up

		This is a scenario to check for the Category A financial requirement text write up

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO      | AA345678A  |
      | Application received date | 23/01/2015 |
    Then The IPS Family TM CW Tool output page provides the following result:
		| Page title              | Financial requirement check    |
		| Page sub text           | Does the applicant meet the financial requirement ‘Category A: With current employer for 6 months or more – person residing in the UK’? |

# New scenario
  Scenario: Page checks for appendix link

		This is a scenario to check the Appendix link is present on the page

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO      | AA345678A  |
      | Application received date | 23/01/2015 |
    Then The IPS Family TM CW Tool output page provides the following result appendix:
		| Page appendix title   | Where can I find the appendix?|
		| Chapter 8 link        | Chapter 8 of the immigration directorate instructions. |
		| FM 1_7 link           | Appendix FM 1.7|

# Changed scenario - Removed threshold amount
  Scenario: Jon meets the Category A Financial Requirement (1)

		Pay date 15th of the month
		Before day of application received date
		He earns £1600 Monthly Gross Income EVERY of the 6 months prior to the Application Received Date

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO      | AA345678A  |
      | Application received date | 23/01/2015 |
    Then The IPS Family TM Case Worker Tool provides the following result:
		| Outcome                               | Success    |
		| Outcome Box Individual Name           | Jon Taylor |
		| Outcome From Date                     | 23/07/2014 |
		| Outcome To Date                       | 23/01/2015 |
		| Your Search Individual Name           | Jon Taylor |
		| Your Search National Insurance Number | AA345678A  |
		| Your Search Application Received Date | 23/01/2015 |

# Changed scenario - Removed threshold amount
  Scenario: Jon meets the Category A Financial Requirement (Caseworker enters the National Insurance Number with spaces)

		Pay date 1st of the month 
		Before day of application received date
		He earns £1550 Monthly Gross Income EVERY of the 6 months prior to the Application Received Date

    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO      |AA 12 34 56 B  |
      | Application received date | 10/01/2015 |
    Then The IPS Family TM Case Worker Tool provides the following result:
		| Outcome                               | Success    |
		| Outcome Box Individual Name           | Jon Taylor |
		| Outcome From Date                     | 10/07/2014 |
		| Outcome To Date                       | 10/01/2015 |
		| Your Search Individual Name           | Jon Taylor |
		| Your Search National Insurance Number | AA123456B  |
		| Your Search Application Received Date | 10/01/2015 |

# Changed scenario - Removed threshold amount
  Scenario: Jon meets the Category A Financial Requirement (2)

		Pay date 28th of the month 
		After day of application received date
		He earns £2240 Monthly Gross Income EVERY of the 6 months prior to the Application Received Date

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO      | BB123456B  |
      | Application received date | 23/01/2015 |
    Then The IPS Family TM Case Worker Tool provides the following result:
		| Outcome | Success |
		| Outcome Box Individual Name | Jon Taylor |
		| Outcome From Date | 23/07/2014 |
		| Outcome To Date | 23/01/2015 |
		| Your Search Individual Name | Jon Taylor |
		| Your Search National Insurance Number | BB123456B | 
		| Your Search Application Received Date | 23/01/2015 |

# Changed scenario - Removed threshold amount
  Scenario: Jon meets the Category A Financial Requirement  (3)

		Pay date 23rd of the month
		On same day of application received date
		He earns £1551 Monthly Gross Income EVERY of the 6 months prior to the Application Received Date

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO      | CC123456C  |
      | Application received date | 23/01/2015 |
    Then The IPS Family TM Case Worker Tool provides the following result:
		| Outcome | Success |
		| Outcome Box Individual Name | Jon Taylor |
		| Outcome From Date | 23/07/2014 |
		| Outcome To Date | 23/01/2015 |
		| Your Search Individual Name | Jon Taylor |
		| Your Search National Insurance Number | CC123456C | 
		| Your Search Application Received Date | 23/01/2015 |

# Changed scenario - Removed threshold amount
  Scenario: Jon meets the Category A Financial Requirement (Caseworker enters the Application Received Date with single numbers for the day and month)

                Pay date 1st of the month
                After day of Application Received Date
		 He earns £3210 Monthly Gross Income EVERY of the 6 months prior to the Application Received Date


    Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO      | CC123456B  |
      | Application received date | 9/1/2015 |
    Then The IPS Family TM Case Worker Tool provides the following result:
                | Outcome | Success |
                | Outcome Box Individual Name | Jon Taylor |
                | Outcome From Date | 09/07/2014 |
                | Outcome To Date | 09/01/2015 |
                | Your Search Individual Name | Jon Taylor |
                | Your Search National Insurance Number | CC123456B |
                | Your Search Application Received Date | 09/01/2015 |


   # Additional Scenario
	Scenario: Mark meets the Category A Financial Requirement

		Pay date 17th, for December 2014
    		Pay date 30th, for October 2014
    		Pay date 15th for all other months
		On different day of application received date
		He earns £1600 Monthly Gross Income EVERY of the 6 months prior to the Application Received Date

		Given Caseworker is using the Income Proving Service Case Worker Tool
		When Robert submits a query to IPS Family TM Case Worker Tool:
			| NINO      | AA123456A  |
			| Application received date | 23/01/2015 |
		Then The IPS Family TM Case Worker Tool provides the following result:
			| Outcome | Success |
			| Outcome Box Individual Name | Mark Jones |
			| Outcome From Date | 23/07/2014 |
			| Outcome To Date | 23/01/2015 |
			| Your Search Individual Name | Mark Jones |
			| Your Search National Insurance Number | AA123456A |
			| Your Search Application Received Date | 23/01/2015 |