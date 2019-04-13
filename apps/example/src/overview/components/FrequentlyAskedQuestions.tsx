import React, { Component } from 'react';

import { Card } from 'z-frontend-composites';
import { Link } from 'z-frontend-elements';
import { BoxProps, Flex } from 'zbase';

// lifted from yourPeople3/client-app/packages/ben-admin/pods/ben-admin/overview/controller.js
const faqItems = [
  {
    text: 'What is an “effective date” for health insurance coverage?',
    url:
      'https://help.zenefits.com/Medical_Dental_Vision/Learn_About_Health_Insurance/001_Introduction_to_Health_Insurance/00-Effective_Date_for_Health_Insurance',
  },
  {
    text: 'What is a “waiting period” for health insurance coverage?',
    url:
      'https://help.zenefits.com/Medical_Dental_Vision/Handling_Zenefits_Insurance_Products_Issues_(Private)/Answering_Common_Health_Insurance_Questions/Waiting_Periods_for_Insurance/',
  },
  {
    text: 'What is a qualifying life event?',
    url: 'https://help.zenefits.com/Medical_Dental_Vision/Learn_About_Health_Insurance/Qualifying_Life_Events',
  },
  {
    text: 'What benefits are available for terminated employees?',
    url:
      'https://help.zenefits.com/Employees/Terminating_Employees_in_Zenefits/FAQs_About_Terminations_in_Zenefits/What_Benefits_are_Available_to_Employees_After_Termination%3F',
  },
  {
    text: 'Frequently asked questions about insurance cards.',
    url: 'https://help.zenefits.com/Medical_Dental_Vision/Enrolling_in_Coverage/FAQs_About_Insurance_Cards',
  },
  {
    text: 'Who provides my insurance services?',
    url: 'https://secure.zenefits.com/licenses/',
  },
];

class FrequentlyAskedQuestions extends Component<BoxProps> {
  render() {
    return (
      <Card {...this.props}>
        <Card.Header>FAQs</Card.Header>
        <Card.Row>
          <Flex column my={-1}>
            {faqItems.map(item => (
              <Link key={item.text} href={item.url} target="_blank" py={1}>
                {item.text}
              </Link>
            ))}
          </Flex>
        </Card.Row>
      </Card>
    );
  }
}

export default FrequentlyAskedQuestions;
