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
    params:[{name:'Mask Size',field:"mask_size"},{name:'Lens',field:"lens"},{name:'Filter[%]',field:"filter"},
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
    name: 'BAE Sputter',
    description:"",
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
    name: 'Sputter Pod',
    description:'',
    category: 'Thin Film Deposition',
    features: {},
    params:[{name:'Evacuation Time',field:"evacuation_time"},
    {name:'End Pressure',field:"end_pressure"},
    {name:'Mag 2 - Target(material)',field:"mag2_target"},
    {name:'Mag 2 - RF/DC',field:"mag2_rf_dc"},
    {name:'Mag 2 - Power or I(W or A)',field:"mag2_power"},
    {name:'Mag 2 - Ar Flow(sccm)',field:"mag2_ar_flow"},
    {name:'Mag 2 - O2/N2(sccm)',field:"mag2_o2"},
    {name:'Mag 2 - Psputter(mbar)',field:"mag2_psputter"},
    {name:'Mag 2 - Bias Voltage(V)',field:"mag2_bias_voltage"},
    {name:'Mag 2 - Time(min)',field:"mag2_time"},
    {name:'Mag 1 - Target(material)',field:"mag1_target"},
    {name:'Mag 1 - Power or I(W or A)',field:"mag1_power"},
    {name:'Mag 1 - Target(material)',field:"mag1_target"},
    {name:'Mag 1 - Ar Flow(sccm)',field:"mag1_ar_flow"},
    {name:'Mag 1 - O2/N2(sccm)',field:"mag1_o2"},
    {name:'Mag 1 - Psputter(mbar)',field:"mag1_psputter"},
    {name:'Mag 1 - Bias Voltage(V)',field:"mag1_bias_voltage"},
    {name:'Mag 1 - Time(min)',field:"mag1_time"},
    {name:'Table etching - Power(W)',field:"table_etching_power"},
    {name:'Table etching - Gas Flow(sccm)',field:"table_etching_gasflow_sccm"},
    {name:'Table etching - Gas Flow(gas used)',field:"table_etching_gasflow_used"},
    {name:'Table etching - Psputter(mbar)',field:"table_etching_psputter"},
    {name:'Table etching - Time(min)',field:"table_etching_time"},
    {name:'Measured Thickness(nm)',field:"measured_thickness"},
    {name:'Remarks',field:"remarks"},

  ]
  },{
    name: 'Parylene Coater',
    description:'',
    category: 'Thin Film Deposition',
    features: {},
    params:[
      {name:'Ppump',field:"ppump"},
      {name:'Pchamber',field:"pchamber"},
      {name:'Parylene Powder(C/N/F)',field:"parylene_powder"},
      {name:'Gram Loaded',field:"gram_loaded"},
      {name:'Silane(ml)',field:"silane"},
      {name:'Plasma Power(w)',field:"plasma_power"},
      {name:'Plasma time, gas and gasflow',field:"Plasma_time_gas"},
      {name:'Remarks(different pressures, thickness measured, ...)',field:"remarks"},
      {name:'Wall T',field:"wall_t"},
      {name:'Step 1 Tdimer',field:"step_1_tdimer"},
      {name:'Step 1 Time',field:"step_1_time"},
      {name:'Step 2 Tdimer',field:"step_2_tdimer"},
      {name:'Step 2 Time',field:"step_2_time"},
      {name:'Measured Thickness',field:"measured_thickness"},
    ]
  },{
    name: 'HITECH Furnace(thermal oxidation)',
    description:'',
    category: 'Oven',
    features: {},
    params:[{name:'O2(Wet or Dry)',field:"o2"},
    {name:'Water Temp(°C)',field:"water_temp"},
    {name:'Temperature(°C)',field:"temperature"},
    {name:'Time',field:"time"},
    {name:'Remarks',field:"remarks"},]
  },{
    name: 'ATV Furnace',
    description:'',
    category: 'Oven',
    features: {},
    params:[
      {name:'Recipe',field:"recipe"},
      {name:'Max Temp(°C)',field:"max_temp"},
      {name:'Ramp(°C/s)',field:"remarks"},
      {name:'Holding Time',field:"holding_time"},
      {name:'Gas (slm) - N2',field:"gas_n2"},
      {name:'Gas (slm) - N2/H2',field:"gas_n2_h2"},
      {name:'Sample Material',field:"sample_material"},
      {name:'Remarks',field:"remarks"}
    ]
  },{
    name: 'Programmable Furnace',
    description:'',
    category: 'Oven',
    features: {},
    params:[]
  },{
    name: 'DRIE',
    description:'',
    category: 'Etching',
    features: {},
    params:[
      {name:'Pload(mbar)',field:"pload"},
      {name:'Pprocess(mbar)',field:"pprocess"},
      {name:'Chuck(3 or 4)',field:"chuck"},
      {name:'Result',field:"result"},
      {name:'Remarks',field:"remarks"},
      {name:'Cleaning Etch Time',field:"cleaningetch"},
    ]
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
    params:[{name:'Objective Used',field:"objective_used"},
    {name:'Remarks',field:"remarks"},]
  },{
    name: 'Dektak Profilometer',
    description:'',
    category: 'Mechanical Inspection',
    features: {},
    params:[{name:'Sample',field:"sample"},
    {name:'Remarks',field:"remarks"},]
  },{
    name: 'Femto Tool',
    description:'',
    category: 'Mechanical Inspection',
    features: {},
    params:[ {name:'Remarks',field:"remarks"}]
  },{
    name: 'MSA Vibrometer',
    description:'',
    category: 'Mechanical Inspection',
    features: {},
    params:[
      {name:'Name of Software Used (PSV/PMA/Visualzation)',field:"software"},
      {name:'Use of heater(°C)',field:"heater"},
      {name:'Device sample and measurement details',field:"device_details"},
      {name:'Remarks',field:"remarks"},
    ]
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