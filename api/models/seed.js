const Room = require('./Room')

Room.create([
  {
    name: 'Slot 1',
    description:'',
    category: 'Cleanroom',
    features: {},
    params:[]
  },
  {
    name: 'Slot 2',
    description:'',
    category: 'Cleanroom',
    features: {},
    params:[]
  },
  {
    name: 'Slot 3',
    description:'',
    category: 'Cleanroom',
    features: {},
    params:[]
  },
  {
    name: 'Slot 4',
    description:'',
    category: 'Cleanroom',
    features: {},
    params:[]
  },
  {
    name: 'Slot 5',
    description:'',
    category: 'Cleanroom',
    features: {},
    params:[]
  },
  {
    name: 'Slot 6',
    description:'',
    category: 'Cleanroom',
    features: {},
    params:[]
  },
  {
    name: 'Slot 7',
    description:'',
    category: 'Cleanroom',
    features: {},
    params:[]
  },
  {
    name: 'Slot 8',
    description:'',
    category: 'Cleanroom',
    features: {},
    params:[]
  },
  {
    name: 'Slot 9',
    description:'',
    category: 'Cleanroom',
    features: {},
    params:[]
  },
  {
    name: 'Slot 10',
    description:'',
    category: 'Cleanroom',
    features: {},
    params:[]
  },
  {
    name: 'LW405 Laser Writer',
    description:"*Try to make long mask fabrication jobs run overnight, so people can use the machine for shorter jobs during the day. * Try to estimate the time you need well!  Do not use lens 4 or 5 when not needed. Laser dot size: 0.7, 2, 4 or 8 micron for lens 5, 4, 3, and 2, respectively. *Be on time. In case of delay, adjust your reservation. No show the first slot = someone else can take your slots of the day. *So If the minimum linewidth you need is 4 microns, lens 3 should suffice. * Be very careful not to crash the lenses!!  Typical (but still stupid) mistakes are:* not putting in the correct substrate tickness. Mind that the metal adjustment plate for 5 inch masks is 1 mm thick and that that thickness must of course be added!* The machine loses focus (ring focus modes). This is not the machine's fault but yours: Only use this mode on even surfaces without confusing patterns. Also, make sure the focus rings are intense enough (typical: light power 9, contrast  and brightness 40, somewhere half way the scale). But this depends on the surface!! if in doubt, use plane focus mode. !! this machine is crucial for almost all projects in the cleanroom. Treat it with utmost care please.",
    category: 'Mask Making',
    features: {},
    params:[{name:'Mask size',field:"mask_size"},{name:'Lens',field:"lens"},{name:'Filter[%]',field:"filter"},
    {name:'Gain',field:"gain"}
  ,{name:'D-step',field:"dstep"},
  {name:'Dose [mJ/cm2]',field:"dose"},
  {name:'Bidirectional',field:"bidirectional"},
  {name:'Mirror',field:"mirror"},
  {name:'Interfero',field:"interfero"},
  {name:'Strips',field:"strips"},
  {name:'X-dimension [mm]',field:"x_dimension"},
  {name:'Y-dimension [mm]',field:"y_dimension"},
  {name:'Computed Area [mm2]',field:"computed_area"},
  {name:'Time',field:"time"},
  {name:'Start Time',field:"start_time"},
  {name:'End Time',field:"end_time"},
  {name:'Developer',field:"developer"},
  {name:'Cr etch',field:"cr_etch"},
  {name:'Remarks',field:"remarks"},
  {name:'Temperature',field:"temperature"},
  {name:'Mask Name',field:"mask_name"},
  {name:'Time[s]',field:"time_1"},
  {name:'Used in time calculation marked by lens type',field:"time_calc"},
  {name:'Time/Strip for calculator',field:"time_or_strip_calc"}
]
  },
  {
    name: 'BAE Sputter(user comment)',
    description:'',
    category: 'Thin Film Deposition',
    features: {},
    params:[
    {name:'Evacuation Time',field:"evacuation_time"},
    {name:'End Pressure',field:"end_pressure"},
    {name:'Target',field:"target"},
    {name:'Power [W]',field:"power"},
    {name:'Sputter Time',field:"sputter_time"},
    {name:'Gas 1',field:"gas_1"},
    {name:'Pressure 1',field:"pressure_1"},
    {name:'Gas 2',field:"gas_2"},
    {name:'Pressure 2',field:"pressure_2"},
    {name:'Measured Thickness',field:"measured_thickness"},
    {name:'Rate',field:"rate"},
    {name:'Stress (MPa)',field:"stress"},
    {name:'Remarks',field:"remarks"},]
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
    params:[{name:'Evacuation Time',field:"evacuation_time"},
    {name:'End Pressure',field:"end_pressure"},
  ]
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