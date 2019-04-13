export const COUNTRIES_WITH_NO_STATE = ['SG', 'GB', 'NL', 'DE', 'IE', 'FR', 'IS'];

type StateList = LabelValue[];
type LabelValue = { label: string; value: string };

// https://github.com/zenefits/z-address/blob/master/addon/constants/work-location.js
export const CA_STATES: StateList = [
  {
    value: 'AB',
    label: 'Alberta',
  },
  {
    value: 'BC',
    label: 'British Columbia',
  },
  {
    value: 'MB',
    label: 'Manitoba',
  },
  {
    value: 'NB',
    label: 'New Brunswick',
  },
  {
    value: 'NL',
    label: 'Newfoundland and Labrador',
  },
  {
    value: 'NT',
    label: 'Northwest Territories',
  },
  {
    value: 'NS',
    label: 'Nova Scotia',
  },
  {
    value: 'NU',
    label: 'Nunavut',
  },
  {
    value: 'ON',
    label: 'Ontario',
  },
  {
    value: 'PE',
    label: 'Prince Edward Island',
  },
  {
    value: 'QC',
    label: 'Quebec',
  },
  {
    value: 'SK',
    label: 'Saskatchewan',
  },
  {
    value: 'YT',
    label: 'Yukon',
  },
];

export const AU_STATES: StateList = [
  {
    value: 'ACT',
    label: 'Australian Capital Territory',
  },
  {
    value: 'JBT',
    label: 'Jervis Bay Territory',
  },
  {
    value: 'NSW',
    label: 'New South Wales',
  },
  {
    value: 'NT',
    label: 'Northern Territory',
  },
  {
    value: 'QLD',
    label: 'Queensland',
  },
  {
    value: 'SA',
    label: 'South Australia',
  },
  {
    value: 'TAS',
    label: 'Tasmania',
  },
  {
    value: 'VIC',
    label: 'Victoria',
  },
  {
    value: 'WA',
    label: 'Western Australia',
  },
];

export const IN_STATES: StateList = [
  {
    value: 'ANDAMAN AND NICOBAR ISLANDS',
    label: 'Andaman and Nicobar Islands',
  },
  {
    value: 'ANDHRA PRADESH',
    label: 'Andhra Pradesh',
  },
  {
    value: 'ARUNACHAL PRADESH',
    label: 'Arunachal Pradesh',
  },
  {
    value: 'ASSAM',
    label: 'Assam',
  },
  {
    value: 'BIHAR',
    label: 'Bihar',
  },
  {
    value: 'CHANDIGARH',
    label: 'Chandigarh',
  },
  {
    value: 'CHHATTISGARH',
    label: 'Chhattisgarh',
  },
  {
    value: 'DADRA AND NAGAR HAVELI',
    label: 'Dadra and Nagar Haveli',
  },
  {
    value: 'DAMAN AND DIU',
    label: 'Daman and Diu',
  },
  {
    value: 'DELHI',
    label: 'Delhi',
  },
  {
    value: 'GOA',
    label: 'Goa',
  },
  {
    value: 'GUJARAT',
    label: 'Gujarat',
  },
  {
    value: 'HARYANA',
    label: 'Haryana',
  },
  {
    value: 'HIMACHAL PRADESH',
    label: 'Himachal Pradesh',
  },
  {
    value: 'JAMMU AND KASHMIR',
    label: 'Jammu and Kashmir',
  },
  {
    value: 'JHARKHAND',
    label: 'Jharkhand',
  },
  {
    value: 'KARNATAKA',
    label: 'Karnataka',
  },
  {
    value: 'KERALA',
    label: 'Kerala',
  },
  {
    value: 'LAKSHADWEEP',
    label: 'Lakshadweep',
  },
  {
    value: 'MADHYA PRADESH',
    label: 'Madhya Pradesh',
  },
  {
    value: 'MAHARASHTRA',
    label: 'Maharashtra',
  },
  {
    value: 'MANIPUR',
    label: 'Manipur',
  },
  {
    value: 'MEGHALAYA',
    label: 'Meghalaya',
  },
  {
    value: 'MIZORAM',
    label: 'Mizoram',
  },
  {
    value: 'NAGALAND',
    label: 'Nagaland',
  },
  {
    value: 'ORISSA',
    label: 'Orissa',
  },
  {
    value: 'PUDUCHERRY',
    label: 'Puducherry',
  },
  {
    value: 'PUNJAB',
    label: 'Punjab',
  },
  {
    value: 'RAJASTHAN',
    label: 'Rajasthan',
  },
  {
    value: 'SIKKIM',
    label: 'Sikkim',
  },
  {
    value: 'TAMIL NADU',
    label: 'Tamil Nadu',
  },
  {
    value: 'TELENGANA',
    label: 'Telengana',
  },
  {
    value: 'TRIPURA',
    label: 'Tripura',
  },
  {
    value: 'UTTARAKHAND',
    label: 'Uttarakhand',
  },
  {
    value: 'UTTAR PRADESH',
    label: 'Uttar Pradesh',
  },
  {
    value: 'WEST BENGAL',
    label: 'West Bengal',
  },
];

export const HK_STATES: StateList = [
  {
    value: 'HONG KONG',
    label: 'Kong Kong',
  },
  {
    value: 'KOWLOON',
    label: 'Kowloon',
  },
  {
    value: 'NEW TERRITORIES',
    label: 'New Territories',
  },
];

export const BR_STATES: StateList = [
  {
    value: 'ACRE',
    label: 'Acre',
  },
  {
    value: 'ALAGOAS',
    label: 'Alagoas',
  },
  {
    value: 'AMAPA',
    label: 'Amapá',
  },
  {
    value: 'AMAZONAS',
    label: 'Amazonas',
  },
  {
    value: 'BAHIA',
    label: 'Bahia',
  },
  {
    value: 'CEARA',
    label: 'Ceará',
  },
  {
    value: 'DISTRITO FEDERAL',
    label: 'Distrito Federal',
  },
  {
    value: 'ESPIRITO SANTO',
    label: 'Espírito Santo',
  },
  {
    value: 'GOIAS',
    label: 'Goiás',
  },
  {
    value: 'MARANHAO',
    label: 'Maranhão',
  },
  {
    value: 'MATO GROSSO',
    label: 'Mato Grosso',
  },
  {
    value: 'MATO GROSSO DO SUL',
    label: 'Mato Grosso do Sul',
  },
  {
    value: 'MINAS GERAIS',
    label: 'Minas Gerais',
  },
  {
    value: 'PARA',
    label: 'Pará',
  },
  {
    value: 'PARAIBA',
    label: 'Paraíba',
  },
  {
    value: 'PARANA',
    label: 'Paraná',
  },
  {
    value: 'PERNAMBUCO',
    label: 'Pernambuco',
  },
  {
    value: 'PIAUI',
    label: 'Piauí',
  },
  {
    value: 'RIO DE JANEIRO',
    label: 'Rio de Janeiro',
  },
  {
    value: 'RIO GRANDE DO NORTE',
    label: 'Rio Grande do Norte',
  },
  {
    value: 'RIO GRANDE DO SUL',
    label: 'Rio Grande do Sul',
  },
  {
    value: 'RONDONIA',
    label: 'Rondônia',
  },
  {
    value: 'RORAIMA',
    label: 'Roraima',
  },
  {
    value: 'SANTA CATARINA',
    label: 'Santa Catarina',
  },
  {
    value: 'SAO PAULO',
    label: 'São Paulo',
  },
  {
    value: 'SERGIPE',
    label: 'Sergipe',
  },
  {
    value: 'TOCANTINS',
    label: 'Tocantins',
  },
];

export const US_STATES: StateList = [
  {
    value: 'AK',
    label: 'Alaska',
  },
  {
    value: 'AL',
    label: 'Alabama',
  },
  {
    value: 'AR',
    label: 'Arkansas',
  },
  {
    value: 'AS',
    label: 'American Samoa',
  },
  {
    value: 'AZ',
    label: 'Arizona',
  },
  {
    value: 'CA',
    label: 'California',
  },
  {
    value: 'CO',
    label: 'Colorado',
  },
  {
    value: 'CT',
    label: 'Connecticut',
  },
  {
    value: 'DC',
    label: 'District of Columbia',
  },
  {
    value: 'DE',
    label: 'Delaware',
  },
  {
    value: 'FL',
    label: 'Florida',
  },
  {
    value: 'FM',
    label: 'FEDERATED STATES OF MICRONESIA',
  },
  {
    value: 'GA',
    label: 'Georgia',
  },
  {
    value: 'GU',
    label: 'Guam',
  },
  {
    value: 'HI',
    label: 'Hawaii',
  },
  {
    value: 'IA',
    label: 'Iowa',
  },
  {
    value: 'ID',
    label: 'Idaho',
  },
  {
    value: 'IL',
    label: 'Illinois',
  },
  {
    value: 'IN',
    label: 'Indiana',
  },
  {
    value: 'KS',
    label: 'Kansas',
  },
  {
    value: 'KY',
    label: 'Kentucky',
  },
  {
    value: 'LA',
    label: 'Louisiana',
  },
  {
    value: 'MA',
    label: 'Massachusetts',
  },
  {
    value: 'MD',
    label: 'Maryland',
  },
  {
    value: 'ME',
    label: 'Maine',
  },
  {
    value: 'MH',
    label: 'MARSHALL ISLANDS',
  },
  {
    value: 'MI',
    label: 'Michigan',
  },
  {
    value: 'MN',
    label: 'Minnesota',
  },
  {
    value: 'MO',
    label: 'Missouri',
  },
  {
    value: 'MP',
    label: 'Northern Mariana Islands',
  },
  {
    value: 'MS',
    label: 'Mississippi',
  },
  {
    value: 'MT',
    label: 'Montana',
  },
  {
    value: 'NA',
    label: 'National',
  },
  {
    value: 'NC',
    label: 'North Carolina',
  },
  {
    value: 'ND',
    label: 'North Dakota',
  },
  {
    value: 'NE',
    label: 'Nebraska',
  },
  {
    value: 'NH',
    label: 'New Hampshire',
  },
  {
    value: 'NJ',
    label: 'New Jersey',
  },
  {
    value: 'NM',
    label: 'New Mexico',
  },
  {
    value: 'NV',
    label: 'Nevada',
  },
  {
    value: 'NY',
    label: 'New York',
  },
  {
    value: 'OH',
    label: 'Ohio',
  },
  {
    value: 'OK',
    label: 'Oklahoma',
  },
  {
    value: 'OR',
    label: 'Oregon',
  },
  {
    value: 'PA',
    label: 'Pennsylvania',
  },
  {
    value: 'PR',
    label: 'Puerto Rico',
  },
  {
    value: 'PW',
    label: 'PALAU',
  },
  {
    value: 'RI',
    label: 'Rhode Island',
  },
  {
    value: 'SC',
    label: 'South Carolina',
  },
  {
    value: 'SD',
    label: 'South Dakota',
  },
  {
    value: 'TN',
    label: 'Tennessee',
  },
  {
    value: 'TX',
    label: 'Texas',
  },
  {
    value: 'UT',
    label: 'Utah',
  },
  {
    value: 'VA',
    label: 'Virginia',
  },
  {
    value: 'VI',
    label: 'Virgin Islands',
  },
  {
    value: 'VT',
    label: 'Vermont',
  },
  {
    value: 'WA',
    label: 'Washington',
  },
  {
    value: 'WI',
    label: 'Wisconsin',
  },
  {
    value: 'WV',
    label: 'West Virginia',
  },
  {
    value: 'WY',
    label: 'Wyoming',
  },
];

type CountryStateMap = { [key: string]: StateList };

export const SUPPORTED_STATES: CountryStateMap = {
  AU: AU_STATES,
  BR: BR_STATES,
  CA: CA_STATES,
  HK: HK_STATES,
  IN: IN_STATES,
  US: US_STATES,
};

export const STATE_LABELS: { [key: string]: string } = {
  AU: 'State/Territory',
  BR: 'State/Province',
  CA: 'Province/Territory',
  HK: 'Territory',
  TW: 'District',
  US: 'State',
};
