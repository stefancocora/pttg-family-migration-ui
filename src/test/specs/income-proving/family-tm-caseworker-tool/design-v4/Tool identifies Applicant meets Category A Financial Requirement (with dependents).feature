Feature: Tool identifies Applicant meets Category A Financial Requirement (with dependants)

		Requirement to meet Category A
			Applicant or Sponsor has been paid for 6 consecutive months with the same employer

		Financial income regulation to pass this Feature File
			Income required amount no dependant child = £18600 (£1550 per month or above for EACH of the previous 6 months from the Application Received Date)
			Additional funds for 1 dependant child = £3800 on top of employment threshold 
			Additional funds for EVERY subsequent dependant child = £2400 on top of employment threshold per child

		Financial income calculation to pass this Feature File
			Income required amount + 1 dependant amount + (Additional dependant amount * number of dependants)/12 = Monthly threshold per month or above for EACH of the previous 6 months from the Application Received Date

			1 Dependant child - £18600+£3800/12 = £1866.67 
			2 Dependant children - £18600+£3800+£2400/12 = £2066.67
			3 Dependant children - £18600+£3800+(£2400*2)/12 = £2266.67 
			5 Dependant children - £18600+£3800+(£2400*4)/12 = £2666.67 
			7 Dependant children - £18600+£3800+(£2400*6)/12 = £3066.67 
			ETC

#New scenario - Added in SD102
  Scenario: Tony Ledo meets the Category A Financial Requirement with 1 dependent

		Pay date 15th of the month
		Before day of application received date
		He earns £4166.67 Monthly Gross Income EVERY of the 6 months prior to the Application Received Date
		He has 1 dependent child

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool (with dependants):
      | NINO      | TL123456A  |
      | Application Received Date | 23/01/2015 |
      | Dependent | 1 |
    Then The IPS Family TM Case Worker Tool provides the following result - with dependents:
		| Outcome                               | Success    |
		| Outcome Box Individual Name           | Tony Ledo  |
		| Outcome From Date                     | 23/07/2014 |
		| Outcome To Date                       | 23/01/2015 |
		| Your Search Individual Name           | Tony Ledo |
		| Your Search Dependent                 | 1 |
		| Your Search National Insurance Number | TL123456A  |
		| Your Search Application Received Date | 23/01/2015 |

#New scenario - Added in SD102
  Scenario: Scarlett Jones meets the Category A Financial Requirement with 3 dependent

		Pay date 2nd of the month
		Before day of application received date
		He earns £3333.33 Monthly Gross Income EVERY of the 6 months prior to the Application Received Date
		He has 3 dependent child

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool (with dependants):
      | NINO      | SJ123456C  |
      | Application Received Date | 8/12/2015 |
      | Dependent | 3 |
    Then The IPS Family TM Case Worker Tool provides the following result - with dependents:
		| Outcome                               | Success    |
		| Outcome Box Individual Name           | Scarlett Jones |
		| Outcome From Date                     | 08/06/2014 |
		| Outcome To Date                       | 08/12/2015 |
		| Your Search Individual Name           | Scarlett Jones |
		| Your Search Dependent                 | 3 |
		| Your Search National Insurance Number | SJ123456C  |
		| Your Search Application Received Date | 08/12/2015 |

#New scenario - Added in SD102
  Scenario: Wasim Mohammed meets the Category A Financial Requirement with 5 dependent

		Pay date 30th of the month
		On the same day of application received date
		He earns £5833.33 Monthly Gross Income EVERY of the 6 months prior to the Application Received Date
		He has 5 dependent child

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool (with dependants):
      | NINO      | WA987654B  |
      | Application Received Date | 28/02/2015 |
      | Dependent | 5 |
    Then The IPS Family TM Case Worker Tool provides the following result - with dependents:
		| Outcome                               | Success    |
		| Outcome Box Individual Name           | Wasim Mohammed |
		| Outcome From Date                     | 30/08/2014 |
		| Outcome To Date                       | 28/02/2015 |
		| Your Search Individual Name           | Wasim Mohammed |
		| Your Search Dependent                 | 5 |
		| Your Search National Insurance Number | WA987654B  |
		| Your Search Application Received Date | 28/02/2015 |