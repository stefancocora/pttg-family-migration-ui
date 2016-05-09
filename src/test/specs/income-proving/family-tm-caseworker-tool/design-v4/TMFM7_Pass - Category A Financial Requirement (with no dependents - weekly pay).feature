Feature: Pass - Category A Financial Requirement (with no dependents - weekly pay)

		Requirement to meet Category A
			Applicant or Sponsor has received 26 payments from the same employer over 182 day period prior to the Application Raised Date

		Financial employment income regulation to pass this Feature File
			Applicant or Sponsor has received 26 weekly Gross Income payments of => £357.69 in the 182 day period prior to the Application Raised Date

#New Scenario - SD105
  Scenario: Molly Henry meets the Category A Financial Requirement

		Pay date 24th of the month
		Pay date is before day of application Raised date
		He earns £470.43 Weekly Gross Income EVERY of the 26 weeks prior to the Application Raised Date

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO      | MH123456A  |
      | Application Raised date | 29/11/2015 |
    Then The IPS Family TM Case Worker Tool provides the following result:
		| Outcome                               | Success    |
		| Outcome Box Individual Name           | Molly Henry |
		| Outcome From Date                     | 31/05/2015 |
		| Outcome To Date                       | 29/11/2015 |
		| Your Search Individual Name           | Molly Henry  |
		| Your Search National Insurance Number | MH123456A  |
		| Your Search Application Raised Date   | 29/11/2015 |

#New Scenario - SD105
  Scenario: Fernando Sanchez meets the Category A Financial Requirement

		Pay date 21st of the month
		After day of application Raised date
		He earns £357.69 Weekly Gross Income EVERY of the 26 weeks prior to the Application Raised Date

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO      | FS123456C  |
      | Application Raised date | 09/10/2015 |
    Then The IPS Family TM Case Worker Tool provides the following result:
		| Outcome                               | Success    |
		| Outcome Box Individual Name           | Fernando Sanchez  |
		| Outcome From Date                     | 10/04/2015 |
		| Outcome To Date                       | 09/10/2015 |
		| Your Search Individual Name           | Fernando Sanchez  |
		| Your Search National Insurance Number | FS123456C     |
		| Your Search Application Raised Date   | 09/10/2015 |

#New Scenario - SD105
  Scenario: Jonathan Odometey meets the Category A Financial Requirement

		Pay date 28th of the month
		On the same day of application Raised date
		He earns £1000.00 Weekly Gross Income EVERY of the 26 weeks prior to the Application Raised Date

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool:
      | NINO      | JO123456A  |
      | Application Raised date | 28/06/2015 |
    Then The IPS Family TM Case Worker Tool provides the following result:
		| Outcome                               | Success    |
		| Outcome Box Individual Name           | Jonathan Odometey  |
		| Outcome From Date                     | 28/12/2014 |
		| Outcome To Date                       | 28/06/2015 |
		| Your Search Individual Name           | Jonathan Odometey  |
		| Your Search National Insurance Number | JO123456A     |
		| Your Search Application Raised Date   | 28/06/2015 |
