const Room = require('./Room')

Room.create([
  {
    name: 'Slot 1',
    description:'',
    category: 'Clean Room',
    features: {},
    params:[]
  },
  {
    name: 'Slot 2',
    description:'',
    category: 'Clean Room',
    features: {},
    params:[]
  },
  {
    name: 'LW405 Laser Writer',
    description:'*Try to make long mask fabrication jobs run overnight, so people can use the machine for shorter jobs during the day. * Try to estimate the time you need well!  Do not use lens 4 or 5 when not needed. Laser dot size: 0.7, 2, 4 or 8 micron for lens 5, 4, 3, and 2, respectively. *Be on time. In case of delay, adjust your reservation. No show the first slot = someone else can take your slots of the day. *So If the minimum linewidth you need is 4 microns, lens 3 should suffice. * Be very careful not to crash the lenses!!',
    category: 'Mask Making',
    features: {},
    params:[{name:'Evacuation time',field:"evacuation_time"},{name:'End pressure',field:"end_pressure"},{name:'Target',field:"target"}]
  },
  {
    name: 'BAE Sputter(user comment)',
    description:'',
    category: 'Thin Film Deposition',
    features: {},
    params:[]
  },{
    name: 'Balzers Evaporator',
    description:'',
    category: 'Thin Film Deposition',
    features: {},
    params:[]
  },{
    name: 'Sputter Pod(user comment)',
    description:'',
    category: 'Thin Film Deposition',
    features: {},
    params:[]
  },{
    name: 'Parylene Coater(user comment)',
    description:'',
    category: 'Thin Film Deposition',
    features: {},
    params:[]
  },{
    name: 'HITECH Furnace(thermal oxidation)',
    description:'',
    category: 'Oven',
    features: {},
    params:[]
  },{
    name: 'ATV Oven',
    description:'',
    category: 'Oven',
    features: {},
    params:[]
  },{
    name: 'Programmable Oven',
    description:'',
    category: 'Oven',
    features: {},
    params:[]
  },{
    name: 'DRIE',
    description:'',
    category: 'Etching',
    features: {},
    params:[]
  },{
    name: 'KOH',
    description:'',
    category: 'Etching',
    features: {},
    params:[]
  },{
    name: 'Nanoscribe',
    description:'',
    category: 'Etching',
    features: {},
    params:[]
  },{
    name: 'Dektak Profilometer',
    description:'',
    category: 'Mechanical Inspection',
    features: {},
    params:[]
  },{
    name: 'Femto Tool',
    description:'',
    category: 'Mechanical Inspection',
    features: {},
    params:[]
  },{
    name: 'MSA Vibrometer',
    description:'',
    category: 'Mechanical Inspection',
    features: {},
    params:[]
  },{
    name: 'Lynceetec DHM',
    description:'',
    category: 'Mechanical Inspection',
    features: {},
    params:[]
  },{
    name: 'Potentiostat Gamry Ref 600+',
    description:'',
    category: 'Electrical Inspection',
    features: {},
    params:[]
  },{
    name: 'Potentiostat PalmSens 4',
    description:'',
    category: 'Electrical Inspection',
    features: {},
    params:[]
  },{
    name: 'Potentiostat MultiChannel PalmSens',
    description:'',
    category: 'Electrical Inspection',
    features: {},
    params:[]
  },{
    name: 'Keithley SMU 2450',
    description:'',
    category: 'Electrical Inspection',
    features: {},
    params:[]
  },{
    name: 'Fume Hoods',
    description:'',
    category: 'Actuator Lab',
    features: {},
    params:[]
  }
  
])
  .then((rooms) => {
    console.log(`Created ${rooms.length} rooms.`)
  })
  .catch((error) => {
    console.error(error)
  })