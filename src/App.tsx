import {useState, useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import "./App.css"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

function DropdownMenu(props: any) {
  
  const handleChange = (event: any) => {
    console.log(event.target.value)
    props.setSelectedValue(event.target.value);
  };

  return (
    <Box sx={{ width: 300, margin: '0 auto', marginTop: '18px', background: '#e7e7e7' }}>
      <FormControl fullWidth>
        <InputLabel id="dropdown-label">select code snippet</InputLabel>
        <Select
          labelId="dropdown-label"
          value={props.selectedValue}
          onChange={handleChange}
          sx={{ width: '300px' }} // Ensure the dropdown width
        >
          {props.codeSnippetTitles.map((el: any, index: any)=> {
            return <MenuItem key={index} value={`${el}`}>
              {el}
            </MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

function CodeHighlighter(props: any) {
  // Split the JSON into lines.
  const inputJson = props.code.split('\n');
  
  // Get the style for highlighting specific lines.
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

  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to the current line whenever it changes
  useEffect(() => {
    if (lineRefs.current[props.props.currentIndex]) {
      lineRefs.current[props.props.currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [props.props.currentIndex]);

  return (
    <Grid
      item
      xs={11.5}
      spacing={1}
      style={{
        marginTop: '10px',
        height: '420px',
        marginBottom: '0vh',
        background: '#e7e7e7',
        borderRadius: '10px',
        padding: '3vw',
        margin: '0.5vw',
        textAlign: 'center',
        width: '100vw',
              overflowY: 'auto',
          overflowX: 'auto'

      }}
    >
      <div
        style={{

          display: 'grid',
          gridTemplateColumns: '40px 1fr', // Two columns: line numbers (fixed width) and code (flexible width)
          fontSize: '16px',
          fontFamily: 'monospace',
          lineHeight: '1.5',
          textAlign: 'left',
          backgroundColor: '#e7e7e7',
          whiteSpace: 'pre-wrap',
        }}
      >
        {inputJson.map((line: any, index: any) => (
          <>
            {/* Line Number */}
            <div
              ref={(el) => (lineRefs.current[index] = el)} 
              key={`line-number-${index}`}
              style={{
                textAlign: 'right',
                paddingRight: '10px',
                color: '#888',
                borderRight: '1px solid #ccc',
                userSelect: 'none', // Prevents text selection for line numbers.
              }}
            >
              {index + 1}
            </div>

            {/* Code Line */}
            <div
              key={`line-code-${index}`}
              style={{
                marginLeft: index === 0 ? '70px' : '0px',
                display: 'block',
                margin: '0.2em 0',
                padding: '0.2em',
                whiteSpace: 'pre-wrap', // Keeps the line formatting intact.
                ...getLineStyle(index),
              }}
            >
              {line}
            </div>
          </>
        ))}
      </div>
    </Grid>
  );
}


function BasicGrid(props: any) {

  // Manage messages and input
  const [messages, setMessages] = useState([
    { text: 'This is a sample message.', time: '10:30 AM' },
    { text: 'Another sample message.', time: '10:31 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, { text: newMessage.trim(), time: currentTime }]);
      setNewMessage(''); // Clear the input field
    }
  };

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
            textAlign: 'center',
            height: '65vh',
          }}
        >
          <CodeHighlighter code={props.code} props={props} />
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
          }}
        >
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
            <p
              style={{
                borderRadius: '10px',
                padding: '5px',
                background: '#e7e7e7',
                height: '88%',
                marginTop: '3px',
              }}
            >
              {props.explainers[props.currentIndex]}
            </p>
          </Grid>
          <br />
          <Grid
            item
            lg={4}
            style={{
              marginTop: '-12px',
              paddingBottom: '12px',
              overflowY: 'auto',
              background: 'lightgrey',
              borderRadius: '10px',
              textAlign: 'center',
              maxHeight: '180px',
            }}
          >
            {messages.map((msg, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '90%' }}>
                <span
                  style={{
                    background: '#e0e0e0',
                    borderRadius: '10px',
                    margin: '10px',
                    padding: '15px',
                    width: '97%',
                    textAlign: 'left',
                  }}
                >
                  {msg.text}
                </span>
                <small
                  style={{
                    alignSelf: 'flex-end',
                    fontSize: '12px',
                    marginTop: '5px',
                    paddingBottom: '10px',
                  }}
                >
                  {msg.time}
                </small>
              </div>
            ))}
          </Grid>
          <Grid
            item
            lg={3}
            style={{
              marginTop: '.9vw',
              marginBottom: '0vw',
              paddingBottom: '1vw',
              background: 'lightgrey',
              borderRadius: '10px',
              textAlign: 'center',
              display: 'flex', // Add flexbox to align children
              alignItems: 'center', // Align items vertically
              justifyContent: 'center', // Optional: Align items horizontally
            }}
          >
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)} // Controlled textarea
              style={{
                height: '50px',
                width: '65%',
                textAlign: 'left',
                marginRight: '10px', // Add space between the textarea and button
              }}
            ></textarea>
            <button onClick={handleSend}>Send</button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}


function App() {
  const [selectedValue, setSelectedValue] = useState('example.hoon');
  const [codes, setCodes] = useState([
    {
      title: 'example.hoon',
      explainers: [':: comment', '?+', '%', '~&', '`this', '%', '`this(...)'],
      code: `:: snippet name
?+    q.vase  (on-poke:def mark vase)
    %print-state
~&  state
    \`this  :: irregular syntax for '[~ this]'
  %reset-state
    \`this(state *versioned-state)  :: irregular syntax for bunt value
  ==`,
    },
    {
      title: 'another.hoon',
      explainers: ['?+', '`this', '%', '~&'],
      code: `
        ?+    another example
          %reset-state
        \`another  :: another example value
          ==
        `,
    },
    {
      title: 'sharing.hoon',
      explainers: ['?+', '%', '~&', '`this(...)'],
      code: `
        %sharing  example code for sharing
        ~&  state
        \`this  :: irregular syntax example
          ==
        `,
    },
  ]);

  const [inputJson, setInputJson] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [direction, setDirection] = useState('');

  // Update inputJson and currentIndex when a new snippet is selected
  useEffect(() => {
    if (selectedValue) {
      const selectedCode = codes.find((code) => code.title === selectedValue);
      if (selectedCode) {
        setInputJson(selectedCode.code.trim().split('\n'));
        setCurrentIndex(-1); // Reset currentIndex for the new snippet
      }
    }
  }, [selectedValue]);

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev < inputJson.length - 1 ? prev + 1 : prev));
  };

  const handleBack = () => {
    setDirection('back');
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result as string);

        if (Array.isArray(jsonData)) {
          // Multiple snippets in an array
          setCodes((prevCodes) => [...prevCodes, ...jsonData]);
        } else if (typeof jsonData === 'object') {
          // Single snippet
          setCodes((prevCodes) => [...prevCodes, jsonData]);
        } else {
          alert('Invalid JSON format');
        }
      } catch (error) {
        alert('Error parsing JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <Box sx={{ width: '100vw', display: 'flex', justifyContent: 'center', padding: '2vw', paddingBottom: '0px' }}>
        <Grid container spacing={1} columns={12}></Grid>
      </Box>
      <BasicGrid
        code={selectedValue && codes.find((code) => code.title === selectedValue)?.code}
        explainers={selectedValue ? codes.find((code) => code.title === selectedValue)?.explainers : []}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        direction={direction}
        setDirection={setDirection}
      />
      <Box
        sx={{
          width: '100vw',
          height: '20vh',
          marginTop: '-30px',
          display: 'flex',
          justifyContent: 'center',
          padding: '2vw',
          paddingBottom: '0px',
        }}
      >
        {/*@ts-ignore*/}
        <Grid
          size={5}
          style={{
            background: 'lightgrey',
            borderRadius: '10px',
            padding: '0px',
            textAlign: 'center',
            width: '33vw',
            margin: '.4vw',
            marginBottom: '1vw',
          }}
        >
          <DropdownMenu
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            codeSnippetTitles={codes.map((code) => code.title)}
          />
        </Grid>
        <Grid container spacing={1} columns={6}>
        {/*@ts-ignore*/}
          <Grid
            size={10}
            style={{
              background: 'lightgrey',
              borderRadius: '10px',
              padding: '0px',
              textAlign: 'center',
              width: '46vw',
              margin: '1vw',
            }}
          >
            <br />
            <button style={{ marginRight: '5px' }} onClick={handleBack} disabled={currentIndex <= 0}>
              Back
            </button>
            <button style={{ margin: '5px' }} onClick={handleNext} disabled={currentIndex >= inputJson.length - 1}>
              Next
            </button>
            <br />
            <br />
          </Grid>
        {/*@ts-ignore*/}
          <Grid
            size={6}
            style={{
              background: 'lightgrey',
              borderRadius: '10px',
              padding: '0px',
              textAlign: 'center',
              width: '22.5vw',
              margin: '0vw',
              marginLeft: '0vw',
              marginTop: '1vw',
              marginBottom: '1vw',
            }}
          >
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              style={{
                margin: '20px',
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
