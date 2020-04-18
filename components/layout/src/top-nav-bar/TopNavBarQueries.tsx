import gql from 'graphql-tag';

export const topNavQuery = gql`
  query TopNavBarQuery {
    dashboard {
      id
      userIntercomHash
      isMTAUser
      isMTAPartnerUser
      isConsoleUser
      isSpoofing
      isTrialCompany
      isTrialSales
      switches
      permission
      canSeeDemoCenter
      isSelfServeTrial
      trialHasFreeLimitedCompany
      companyTypeIsDemo
      trialPromoCode
      user {
        id
        first_name
        last_name
        email
      }
      employee {
        id
        employeeNumber
        first_name
        last_name
        photoUrl
      }
      partner {
        id
        companyId
      }
      company {
        id
        name
        regEmployeeCount
      }
    }
    prerequisiteRedirect
  }
`;
