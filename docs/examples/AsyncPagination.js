import React, { Component } from 'react';
import AsyncSelect from '../../src/Async';

type State = {
  inputValue: string,
};

const promiseOptions = (inputValue, callback, pageNo) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(getPages(10, pageNo));
    }, 50);
  });

const getPages = (pageSize, pageNumber = 1) => {
    return dummyJSON.slice(0, pageSize*pageNumber);
};

export default class AsyncPagination extends Component<*, State> {

  state = { inputValue: '' };

  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };

  render() {
    return (
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions
        loadOptionsPagination={promiseOptions}
      />
    );
  }
}

const dummyJSON = [
    {
        'value': 0,
        'label': 'Kathrine Winters'
    },
    {
        'value': 1,
        'label': 'Alfreda Hancock'
    },
    {
        'value': 2,
        'label': 'Ellis Massey'
    },
    {
        'value': 3,
        'label': 'Owen Lester'
    },
    {
        'value': 4,
        'label': 'Baird Boyer'
    },
    {
        'value': 5,
        'label': 'Laurie Hanson'
    },
    {
        'value': 6,
        'label': 'Abbott Gilbert'
    },
    {
        'value': 7,
        'label': 'Cortez Morton'
    },
    {
        'value': 8,
        'label': 'Davis Carr'
    },
    {
        'value': 9,
        'label': 'Deanna Ramsey'
    },
    {
        'value': 10,
        'label': 'Thelma Lucas'
    },
    {
        'value': 11,
        'label': 'Jean Gill'
    },
    {
        'value': 12,
        'label': 'Flossie Burks'
    },
    {
        'value': 13,
        'label': 'Jordan Alvarado'
    },
    {
        'value': 14,
        'label': 'Melba Miranda'
    },
    {
        'value': 15,
        'label': 'Leslie Davvalueson'
    },
    {
        'value': 16,
        'label': 'Lynn Turner'
    },
    {
        'value': 17,
        'label': 'Avis Sargent'
    },
    {
        'value': 18,
        'label': 'Gwen Mueller'
    },
    {
        'value': 19,
        'label': 'Davvalue Sutton'
    },
    {
        'value': 20,
        'label': 'Susie Matthews'
    },
    {
        'value': 21,
        'label': 'Bessie Reeves'
    },
    {
        'value': 22,
        'label': 'Diann Cobb'
    },
    {
        'value': 23,
        'label': 'James Weiss'
    },
    {
        'value': 24,
        'label': 'Kinney May'
    },
    {
        'value': 25,
        'label': 'Franklin Wiley'
    },
    {
        'value': 26,
        'label': 'Amber Bass'
    },
    {
        'value': 27,
        'label': 'Lilia Clarke'
    },
    {
        'value': 28,
        'label': 'Yolanda Odom'
    },
    {
        'value': 29,
        'label': 'Meyers Forbes'
    },
    {
        'value': 30,
        'label': 'Sears Estrada'
    },
    {
        'value': 31,
        'label': 'Riggs Jones'
    },
    {
        'value': 32,
        'label': 'Ryan Blair'
    },
    {
        'value': 33,
        'label': 'Isabella Ball'
    },
    {
        'value': 34,
        'label': 'George Flowers'
    },
    {
        'value': 35,
        'label': 'Amelia Henson'
    },
    {
        'value': 36,
        'label': 'Weber Bowers'
    },
    {
        'value': 37,
        'label': 'Kaitlin Gould'
    },
    {
        'value': 38,
        'label': 'Henderson Acosta'
    },
    {
        'value': 39,
        'label': 'Weeks Bryan'
    },
    {
        'value': 40,
        'label': 'Stevenson Stephenson'
    },
    {
        'value': 41,
        'label': 'Anna Lancaster'
    },
    {
        'value': 42,
        'label': 'Leona Hester'
    },
    {
        'value': 43,
        'label': 'Montoya Parker'
    },
    {
        'value': 44,
        'label': 'Cabrera Fuller'
    },
    {
        'value': 45,
        'label': 'Eddie Dorsey'
    },
    {
        'value': 46,
        'label': 'Singleton Carroll'
    },
    {
        'value': 47,
        'label': 'Cathryn Mooney'
    },
    {
        'value': 48,
        'label': 'Ora Lawson'
    },
    {
        'value': 49,
        'label': 'Le Nelson'
    },
    {
        'value': 50,
        'label': 'Dunlap Delacruz'
    },
    {
        'value': 51,
        'label': 'Gina Madden'
    },
    {
        'value': 52,
        'label': 'Jeannette Benton'
    },
    {
        'value': 53,
        'label': 'Luz Huber'
    },
    {
        'value': 54,
        'label': 'Santos Eaton'
    },
    {
        'value': 55,
        'label': 'Landry Odonnell'
    },
    {
        'value': 56,
        'label': 'Howe Pruitt'
    },
    {
        'value': 57,
        'label': 'Bennett Waller'
    },
    {
        'value': 58,
        'label': 'Valentine Pratt'
    },
    {
        'value': 59,
        'label': 'Envalue Yates'
    },
    {
        'value': 60,
        'label': 'Bettie Britt'
    },
    {
        'value': 61,
        'label': 'Lindsey Palmer'
    },
    {
        'value': 62,
        'label': 'Rowena Mcintosh'
    },
    {
        'value': 63,
        'label': 'Ratliff Grimes'
    },
    {
        'value': 64,
        'label': 'Shields Cameron'
    },
    {
        'value': 65,
        'label': 'Katie Best'
    },
    {
        'value': 66,
        'label': 'Sylvia Clark'
    },
    {
        'value': 67,
        'label': 'Harriett Brown'
    },
    {
        'value': 68,
        'label': 'Carey Romero'
    },
    {
        'value': 69,
        'label': 'Irwin Langley'
    },
    {
        'value': 70,
        'label': 'Hart Sampson'
    },
    {
        'value': 71,
        'label': 'Becker Ingram'
    },
    {
        'value': 72,
        'label': 'Crawford Rivers'
    },
    {
        'value': 73,
        'label': 'Mcguire Finley'
    },
    {
        'value': 74,
        'label': 'Stuart Walls'
    },
    {
        'value': 75,
        'label': 'Penny Guerrero'
    },
    {
        'value': 76,
        'label': 'Watkins Harrington'
    },
    {
        'value': 77,
        'label': 'Cannon Guerra'
    },
    {
        'value': 78,
        'label': 'Gallagher Velez'
    },
    {
        'value': 79,
        'label': 'Christian Roberts'
    },
    {
        'value': 80,
        'label': 'Adams Fuentes'
    },
    {
        'value': 81,
        'label': 'Aisha Mcneil'
    },
    {
        'value': 82,
        'label': 'Vicki Pennington'
    },
    {
        'value': 83,
        'label': 'Frieda Silva'
    },
    {
        'value': 84,
        'label': 'Katheryn Summers'
    },
    {
        'value': 85,
        'label': 'Roxie Chapman'
    },
    {
        'value': 86,
        'label': 'Molly Graves'
    },
    {
        'value': 87,
        'label': 'Burris Terry'
    },
    {
        'value': 88,
        'label': 'Faye Combs'
    },
    {
        'value': 89,
        'label': 'Sasha Reynolds'
    },
    {
        'value': 90,
        'label': 'Janell Berg'
    },
    {
        'value': 91,
        'label': 'Ruby Cantu'
    },
    {
        'value': 92,
        'label': 'Keller Rowe'
    },
    {
        'value': 93,
        'label': 'Newton Kvalued'
    },
    {
        'value': 94,
        'label': 'Marion Lamb'
    },
    {
        'value': 95,
        'label': 'Abby Hull'
    },
    {
        'value': 96,
        'label': 'Mcdowell Holden'
    },
    {
        'value': 97,
        'label': 'Donovan Moss'
    },
    {
        'value': 98,
        'label': 'Pansy Kelley'
    },
    {
        'value': 99,
        'label': 'Walker Cash'
    },
    {
        'value': 100,
        'label': 'Barbra Duran'
    },
    {
        'value': 101,
        'label': 'Allyson Little'
    },
    {
        'value': 102,
        'label': 'Marylou Phelps'
    },
    {
        'value': 103,
        'label': 'Marie Thomas'
    },
    {
        'value': 104,
        'label': 'Melton William'
    },
    {
        'value': 105,
        'label': 'Hooper Valdez'
    },
    {
        'value': 106,
        'label': 'Carlson Galloway'
    },
    {
        'value': 107,
        'label': 'Erickson Pittman'
    },
    {
        'value': 108,
        'label': 'Reilly Simon'
    },
    {
        'value': 109,
        'label': 'Mckee Lindsey'
    },
    {
        'value': 110,
        'label': 'Neal Tanner'
    },
    {
        'value': 111,
        'label': 'Darlene Fields'
    },
    {
        'value': 112,
        'label': 'Hernandez Fleming'
    },
    {
        'value': 113,
        'label': 'Darla Mccoy'
    },
    {
        'value': 114,
        'label': 'Holly Rich'
    },
    {
        'value': 115,
        'label': 'Mara Cohen'
    },
    {
        'value': 116,
        'label': 'Katherine Ayers'
    },
    {
        'value': 117,
        'label': 'Elsie Everett'
    },
    {
        'value': 118,
        'label': 'Eula Bray'
    },
    {
        'value': 119,
        'label': 'Nikki Gray'
    },
    {
        'value': 120,
        'label': 'Michele Crane'
    },
    {
        'value': 121,
        'label': 'Blackwell Hoover'
    },
    {
        'value': 122,
        'label': 'Theresa Hebert'
    },
    {
        'value': 123,
        'label': 'Pratt Hoffman'
    },
    {
        'value': 124,
        'label': 'Hinton Sweeney'
    },
    {
        'value': 125,
        'label': 'Cardenas Potts'
    },
    {
        'value': 126,
        'label': 'Rhodes Warren'
    },
    {
        'value': 127,
        'label': 'Atkinson Gamble'
    },
    {
        'value': 128,
        'label': 'Battle Herman'
    },
    {
        'value': 129,
        'label': 'Juliana Hurst'
    },
    {
        'value': 130,
        'label': 'Rodgers Dodson'
    },
    {
        'value': 131,
        'label': 'Marissa Larson'
    },
    {
        'value': 132,
        'label': 'Mack Shaw'
    },
    {
        'value': 133,
        'label': 'Adkins Payne'
    },
    {
        'value': 134,
        'label': 'Robin Collier'
    },
    {
        'value': 135,
        'label': 'Elnora Dotson'
    },
    {
        'value': 136,
        'label': 'Cherry Wilkins'
    },
    {
        'value': 137,
        'label': 'Whitney Jenkins'
    },
    {
        'value': 138,
        'label': 'Barron Shaffer'
    },
    {
        'value': 139,
        'label': 'Jennifer Albert'
    }
];
