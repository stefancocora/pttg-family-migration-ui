Feature: Failure - Category A Financial Requirement (with Dependantss - weekly pay)

		Requirement to meet Category A
			Applicant or Sponsor has received < 26 payments from the same employer over 182 day period prior to the Application Raised Date

		Financial income regulation to pass this Feature File
			Income required amount no dependant child = £18600 (£1550 per month or above for EACH of the previous 6 months from the Application Raised Date)
			Additional funds for 1 dependant child = £3800 on top of employment threshold
			Additional funds for EVERY subsequent dependant child = £2400 on top of employment threshold per child

		Financial income calculation to pass this Feature File
			Income required amount + 1 dependant amount + (Additional dependant amount * number of dependants)/52 weeks in the year = 26 Weekly Gross Income payments < threshold in the 182 day period prior to the Application Raised Date

			1 Dependant child - £18600+£3800/52 = £430.77
			2 Dependant children - £18600+£3800+£2400/12 = £476.92
			3 Dependant children - £18600+£3800+(£2400*2)/12 = £523.08
			5 Dependant children - £18600+£3800+(£2400*4)/12 = £615.38
			7 Dependant children - £18600+£3800+(£2400*6)/12 = £707.69
			ETC

#New scenario - Added in SD126
  Scenario: Donald Sweet does not meet the Category A Financial Requirement (She has earned < the Cat A financial threshold)

		Pay date 15th of the month
		Before day of Application raised Date
		He has 3 columbian dependants
		He has received 26 Weekly Gross Income payments of £225.40 in the 182 day period prior to the Application Raised Date from the same employer

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool (with dependants):
      | NINO      | DS123456C  |
      | Application raised Date | 03/11/2015 |
      | Dependants | 4 |
    Then The IPS Family TM Case Worker Tool provides the following error result (with Dependants):
		| Page dynamic heading | Donald Sweet doesn't meet the Category A requirement |
		| Category A check failure reason | they haven't met the required amount. |

		| Your Search Individual Name | Donald Sweet |
		| Your Search Dependants                 | 3 |
		| Your Search National Insurance Number | DS123456C |
		| Your Search Application raised Date | 03/11/2015 |

#New scenario - Added in SD126
  Scenario: John Lister does not meet the Category A Financial Requirement (He has earned < the Cat A financial threshold)

		Pay date 10th of the month
		On the same day of application raised date
		He has 2 Chinese dependants
		He has received 26 Weekly Gross Income payments of £475.67 in the 182 day period prior to the Application Raised Date from the same employer

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool (with dependants):
      | NINO      | JL123456B  |
      | Application raised date | 10/07/2015 |
      | Dependants | 2 |
    Then The IPS Family TM Case Worker Tool provides the following error result (with Dependants):
		| Page dynamic heading | Brian Sinclair doesn't meet the Category A requirement |
		| Category A check failure reason | they haven't met the required amount. |

		| Your Search Individual Name | John Lister |
		| Your Search Dependants                 | 2 |
		| Your Search National Insurance Number | JL123456B |
		| Your Search Application raised Date | 10/07/2015 |

#New scenario - Added in SD126
  Scenario: Gary Goldstein does not meet the Category A employment duration Requirement (He has worked for his current employer for only 20 weeks)

		Pay date 3rd of the month
		On same day of application raised date
		He has 3 Isreali dependants
		He has received 20 Weekly Gross Income payments of £516.67 in the 182 day period prior to the Application Raised Date from the same employer
		He worked for a different employer before his current employer

   Given Caseworker is using the Income Proving Service Case Worker Tool
    When Robert submits a query to IPS Family TM Case Worker Tool (with dependants):
      | NINO      | GG987654A  |
      | Application raised date | 03/09/2015 |
      | Dependants | 3 |
    Then The IPS Family TM Case Worker Tool provides the following error result (with Dependants):
		| Page dynamic heading |Steve Yu doesn't meet the Category A requirement|
		| Category A check failure reason | they haven't been with their current employer for 6 months. |

		| Your Search Individual Name | Gary Goldstein |
		| Your Search Dependants                 | 3 |
		| Your Search National Insurance Number | GG987654A |
		| Your Search Application raised Date | 03/09/2015 |
