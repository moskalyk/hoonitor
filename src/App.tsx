import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import "./App.css"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

function DropdownMenu() {
  const [selectedValue, setSelectedValue] = useState('');
  
  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box sx={{ width: 300, margin: '0 auto', marginTop: '18px', background: '#e7e7e7' }}>
      <FormControl fullWidth>
        <InputLabel id="dropdown-label">select code snippet</InputLabel>
        <Select
          labelId="dropdown-label"
          value={selectedValue}
          onChange={handleChange}
          sx={{ width: '300px' }} // Ensure the dropdown width
        >
          {Array.from({ length: 10 }, (_, index) => (
            <MenuItem key={index} value={`Option ${index + 1}`}>
              Option {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

function CodeHighlighter(props: any) {
   // Split the JSON into lines.

const inputJson = `
?+    q.vase  (on-poke:def mark vase)
  %print-state
~&  state
\`this  :: irregular syntax for '[~ this]'
  %reset-state
\`this(state *versioned-state)  :: irregular syntax for bunt value
==
`.trim().split('\n');

  const getLineStyle = (index: any) => {
    if (index === props.props.currentIndex) {
      return { backgroundColor: 'lime', color: 'white' }; // Current line.
    } else if (props.props.index === props.props.currentIndex + 1 && props.props.direction === 'next') {
      return { backgroundColor: 'blue', color: 'white' }; // Next line.
    } else if (props.props.index === props.props.currentIndex - 1 && props.props.direction === 'back') {
      return { backgroundColor: 'red', color: 'white' }; // Previous line.
    }
    return {};
  };

  return (
    <Grid
      item
      xs={11.5}
      spacing={1}
      style={{
        marginTop: '-1vw',
        paddingTop: '-2vh',
        marginBottom: '1.2vw',
        // background: 'lightgrey',
        borderRadius: '10px',
        padding: '2vw',
        margin: '0.5vw',
        textAlign: 'center',
        background: 'white',
        width: '100vw',
        // height: '50vh',
        // overflow: 'auto',
      }}
    >
      <div
        style={{
          fontSize: '16px',
          fontFamily: 'monospace',
          lineHeight: '1.5',
          textAlign: 'left',
          backgroundColor: 'transparent',
          // padding: '1vw',
        }}
      >
        {inputJson.map((line, index) => (
          <div
            key={index}
            style={{
              display: 'block', // Ensures each line is on a new line.
              margin: '0.2em 0',
              padding: '0.2em',
              whiteSpace: 'pre-wrap', // Keeps the line formatting intact.
              ...getLineStyle(index),
            }}
          >
            {line}
          </div>
        ))}
      </div>
      <div>
        
      </div>
    </Grid>
  );
}

function BasicGrid(props: any) {

  const runesRaw = [
    '?+',
    '%',
    '~&',
    '`this',
    '%',
    '`this(...)',
  ]

  return (
    <Box sx={{ width: '100vw', display: 'flex', justifyContent: 'center', padding: '1vw' }}>
      <Grid container spacing={2} columns={12}>
        {/* Larger Grid */}
        <Grid
          item
          xs={7}
          spacing={1}
          style={{
            margin: '2vw',
            marginBottom: '1.2vw',
            background: 'lightgrey',
            borderRadius: '10px',
            // padding: '2vw',
            textAlign: 'center',
            height: '50vh',
          }}>
          <CodeHighlighter props={props}/>
        </Grid>

        {/* Stacked Grids */}
        <Grid
          container
          item
          xs={4}
          direction="column"
          spacing={1}
          style={{ 
            margin: '1vw',
          }}>

          <Grid
            item
            lg={4}
            style={{
              padding: '1vw',
              background: 'lightgrey',
              borderRadius: '10px',
              textAlign: 'left',
            }}
          >
            <p style={{borderRadius: '10px', padding: '5px', background: '#e7e7e7', height: '90%', marginTop: '5px'}}>{runesRaw[props.currentIndex]}</p>
          </Grid>
          <br/>
          <Grid
            item
            lg={4}
            style={{
              height: '50vh',
              background: 'lightgrey',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <p>Comments</p>
          </Grid>
          <Grid
            item
            lg={2}
            style={{
              marginTop: '1vw',
              marginBottom: '0vw',
              paddingBottom: '1vw',
              background: 'lightgrey',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <p>chat input</p>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

function App() {

  const inputJson = `
  ?+    q.vase  (on-poke:def mark vase)
      %print-state
    ~&  state
    \`this  :: irregular syntax for '[~ this]'
      %reset-state
    \`this(state *versioned-state)  :: irregular syntax for bunt value
  ==
  `.trim().split('\n');

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [direction, setDirection] = useState(''); // Tracks navigation direction.
  const [rune, setRune] = useState(''); // Tracks navigation direction.

  useEffect(() => {
    setRune(inputJson[currentIndex])
  }, [currentIndex, direction, rune])

  useEffect(() => {
    console.log(rune)
  }, [rune])


const handleNext = () => {
    setDirection('next');
    console.log('next')
    setCurrentIndex((prev) => (prev < inputJson.length - 1 ? prev + 1 : prev));
  };

  const handleBack = () => {
    setDirection('back');
    console.log('back')
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <>
      <Box sx={{ width: '100vw', display: 'flex', justifyContent: 'center', padding: '2vw', paddingBottom: '0px' }}>
      {/*@ts-ignore*/}
      <Grid container spacing={1} columns={12}>
    {/*@ts-ignore*/}
          <Grid
            size={4}
            style={{
              background: "lightgrey",
              borderRadius: "10px",
              padding: "0px",
              textAlign: 'center',
              width: '25vw',
              margin: '1vw'
            }}
          >
          <DropdownMenu/>
          </Grid>
          {/*@ts-ignore*/}
          <Grid
            size={6}
            style={{
              background: "lightgrey",
              borderRadius: "10px",
              padding: "0px",
              textAlign: 'center',
              width: '45vw',
              margin: '1vw'
            }}
          >
            <input style={{margin: '20px', height: '42px', width: '400px', textAlign:'center'}} placeholder="github file"></input><button>download</button>
          </Grid>
          {/*@ts-ignore*/}
          <Grid
            size={6}
            style={{
              background: "lightgrey",
              borderRadius: "10px",
              padding: "0px",
              textAlign: 'center',
              width: '21.5vw',
              margin: '1vw'
            }}
          >
          <button style={{margin: '20px'}}>upload</button>
          </Grid>
        </Grid>
      </Box>
      <BasicGrid
      currentIndex={currentIndex} 
      setCurrentIndex={setCurrentIndex}
      direction={direction}
      setDirection={setDirection}
      />
      <Box sx={{ width: '100vw', display: 'flex', justifyContent: 'center', padding: '2vw', paddingBottom: '0px' }}>
      <Grid container spacing={1} columns={12}>
    {/*@ts-ignore*/}
          <Grid
            size={10}
            style={{
              background: "lightgrey",
              borderRadius: "10px",
              padding: "0px",
              textAlign: 'center',
              width: '96vw',
              margin: '1vw'
            }}
          >
          <br/>
          <button style={{marginRight: '5px'}} onClick={handleBack} disabled={currentIndex <= 0}>
            Back
          </button>
          <button style={{margin: '5px'}} onClick={handleNext} disabled={currentIndex >= inputJson.length - 1}>
            Next
          </button>
          <br/>
          <br/>
          </Grid>
        </Grid>
      </Box>
    </>

  );
}

export default App;
