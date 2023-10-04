import React from 'react';
import user from '../../assets/images/user/1.jpg';
import user2 from '../../assets/images/user/2.png';
import user3 from '../../assets/images/user/3.jpg';
import user4 from '../../assets/images/user/4.jpg';
import user5 from '../../assets/images/user/5.jpg';
import user6 from '../../assets/images/user/6.jpg';
import user7 from '../../assets/images/user/7.jpg';
import user8 from '../../assets/images/user/8.jpg';
import user9 from '../../assets/images/user/9.jpg';
import user10 from '../../assets/images/user/10.jpg';
import user11 from '../../assets/images/user/11.png';
import user12 from '../../assets/images/user/12.png';
import ActionButton from '../../components/ActionButtons/ActionButtons';

export const supportData = [
  {
    image: <img src={user} className="img-40 img-fluid" alt="" />,
    Name: 'System Architect',
    code: 'ADASD',
    Range: 'Rs 5000 - Rs 6000',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-primary"
            style={{ width: '80%' }}
            role="progressbar"
          ></div>
        </div>
      </div>
    ),
    discounted: 'Rs 5421',
    actions: <ActionButton />
  },

  {
    image: <img src={user2} className="img-40 img-fluid" alt="" />,
    Name: 'Junior Technical Author',
    code: 'VGGDSD667',
    office: 'San Francisco',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-secondary"
            role="progressbar"
            style={{ width: '50%' }}
          ></div>
        </div>
      </div>
    ),
    extn: 1562,
    email: 'a.cox@datatables.net',
  },

  {
    image: <img src={user3} className="img-40 img-fluid" alt="" />,
    Name: 'Software Engineer',
    code: '$132,000',
    office: 'London',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-success"
            style={{ width: '60%' }}
            role="progressbar"
          ></div>
        </div>
      </div>
    ),
    extn: 2558,
    email: 'b.greer@datatables.net',
  },

  {
    image: <img src={user4} className="img-40 img-fluid" alt="" />,
    Name: 'Integration Specialist',
    code: '$372,000',
    office: 'New York',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-success"
            role="progressbar"
            style={{ width: '70%' }}
          ></div>
        </div>
      </div>
    ),
    extn: 4804,
    email: 'b.williamson@datatables.net',
  },

  {
    image: <img src={user5} className="img-40 img-fluid" alt="" />,
    Name: 'Pre-Sales Support',
    code: '$106,450',
    office: 'New York',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-success"
            role="progressbar"
            style={{ width: '20%' }}
          ></div>
        </div>
      </div>
    ),
    extn: 8330,
    email: 'c.vance@datatables.net',
  },

  {
    image: <img src={user5} className="img-40 img-fluid" alt="" />,
    Name: 'Junior Technical Author',
    code: '$86,000',
    office: 'San Francisco',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-success"
            role="progressbar"
            style={{ width: '10%' }}
          ></div>
        </div>
      </div>
    ),
    extn: 1562,
    email: 'a.cox@datatables.net',
  },

  {
    image: <img src={user6} className="img-40 img-fluid" alt="" />,
    Name: 'Senior Javascript Developer',
    code: '$433,060',
    office: 'San Francisco',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-secondary"
            style={{ width: '90%' }}
            role="progressbar"
          ></div>
        </div>
      </div>
    ),
    extn: 6224,
    email: 'c.kelly@datatables.net',
  },
  {
    image: <img src={user7} className="img-40 img-fluid" alt="" />,
    Name: 'Senior Javascript Developer',
    code: '$433,060',
    office: 'San Francisco',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-secondary"
            role="progressbar"
            style={{ width: '60%' }}
          ></div>
        </div>
      </div>
    ),
    extn: 6224,
    email: 'c.kelly@datatables.net',
  },

  {
    image: <img src={user8} className="img-40 img-fluid" alt="" />,
    Name: 'Accountant',
    code: '$162,700',
    office: 'Tokyo',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-success"
            role="progressbar"
            style={{ width: '50%' }}
          ></div>
        </div>
      </div>
    ),
    extn: 5407,
    email: 'a.satou@datatables.net',
  },

  {
    image: <img src={user9} className="img-40 img-fluid" alt="" />,
    Name: 'Integration Specialist',
    code: '$372,000',
    office: 'New York',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-info"
            role="progressbar"
            style={{ width: '40%' }}
          ></div>
        </div>
      </div>
    ),
    extn: 4804,
    email: 'b.williamson@datatables.net',
  },

  {
    image: <img src={user10} className="img-40 img-fluid" alt="" />,
    Name: 'Sales Assistant',
    code: '$137,500',
    office: 'San Francisco',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-warning"
            style={{ width: '60%' }}
            role="progressbar"
          ></div>
        </div>
      </div>
    ),
    extn: 9608,
    email: 'h.chandler@datatables.net',
  },

  {
    image: <img src={user11} className="img-40 img-fluid" alt="" />,
    Name: 'Integration Specialist',
    code: '$327,900',
    office: 'Tokyo',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-secondary"
            style={{ width: '80%' }}
            role="progressbar"
          ></div>
        </div>
      </div>
    ),
    extn: 6200,
    email: 'r.davidson@datatables.net',
  },

  {
    image: <img src={user12} className="img-40 img-fluid" alt="" />,
    Name: 'Javascript Developer',
    code: '$205,500',
    office: 'San Francisco',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-success"
            role="progressbar"
            style={{ width: '50%' }}
          ></div>
        </div>
      </div>
    ),
    extn: 2360,
    email: 'c.hurst@datatables.net',
  },

  {
    image: <img src={user3} className="img-40 img-fluid" alt="" />,
    Name: 'Software Engineer',
    code: '$103,600',
    office: 'Edinburgh',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-primary"
            role="progressbar"
            style={{ width: '35%' }}
          ></div>
        </div>
      </div>
    ),
    extn: 1667,
    email: 's.frost@datatables.net',
  },

  {
    image: <img src={user4} className="img-40 img-fluid" alt="" />,
    Name: 'Office Manager',
    code: '$90,560',
    office: 'London',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-warning"
            role="progressbar"
            style={{ width: '55%' }}
          ></div>
        </div>
      </div>
    ),
    extn: 3814,
    email: 'j.gaines@datatables.net',
  },

  {
    image: <img src={user} className="img-40 img-fluid" alt="" />,
    Name: 'Support Lead',
    code: '$342,000',
    office: 'Edinburgh',
    skill: (
      <div className="progress-showcase">
        <div className="progress sm-progress-bar">
          <div
            className="progress-bar custom-progress-width bg-danger"
            role="progressbar"
            style={{ width: '93%' }}
          ></div>
        </div>
      </div>
    ),
    extn: 9497,
    email: 'q.flynn@datatables.net',
  },
];

export const supportColumns = [
  {
    name: 'Image',
    selector: 'image',
    sortable: true,
    center: true,
    width: '100px',
    style: {
        textAlign: "center",
        padding: "0px"
    }
  },
  {
    name: 'Issued By',
    selector: 'Name',
    sortable: true,
    center: true,
    style: {
        textAlign: "center",
        padding: "0px"
    }
  },
  {
    name: 'Code',
    selector: 'code',
    sortable: true,
    center: true,
    style: {
        textAlign: "center",
        padding: "0px"
    }
  },
  {
    name: 'Range',
    selector: 'Range',
    sortable: true,
    center: true,
    style: {
        textAlign: "center",
        padding: "0px"
    }
  },
  {
    name: 'Discount Price',
    selector: 'discounted',
    sortable: true,
    center: true,
    style: {
        textAlign: "center",
        padding: "0px"
    }
  },
  {
    name: 'Actions',
    selector: 'actions',
    sortable: true,
    center: true,
    width: '400px'
  },
];

