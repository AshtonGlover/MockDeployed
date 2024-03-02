import '../styles/main.css';
import { Dispatch, SetStateAction, useState} from 'react';
import { ControlledInput } from './ControlledInput';
import {mockedJson} from '../mock_json/mockedJson';
import {CommandExecutor} from './repl_functions/CommandExecuter'

interface REPLInputProps{
    history: string[];
    setHistory: Dispatch<SetStateAction<string[]>>;
    outputMode: string;
    setOutputMode: React.Dispatch<React.SetStateAction<string>>;
}

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props : REPLInputProps) {
    // Remember: let React manage state in your webapp. 
    // Manages the contents of the input box
    const [commandString, setCommandString] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const mockedJsonInstance = new mockedJson();
    const commandExecutor = new CommandExecutor();
    const outputMode = props.outputMode;

      function handleClick(commandString: string) {
        setCount(count + 1);
        props.setHistory([...props.history, commandString]);
        mockedJsonInstance.request(props.history)
        setCommandString("");
      }
    
    // TODO WITH TA: build a handleSubmit function called in button onClick
    // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
    // add to it with new commands.
    /**
     * We suggest breaking down this component into smaller components, think about the individual pieces 
     * of the REPL and how they connect to each other...
     */
    return (
        <div className="repl-input">
            {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
            {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
            <fieldset>
              <legend>Enter a command:</legend>
              <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"}/>
            </fieldset>
            {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
            {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
            <button onClick={() => handleClick(commandString)}>Submit ({count} submissions)</button>

            {/* Radio button for selecting output mode */}
            <div className="output-mode">
              Output Mode:
              <label className="radio-label">
                <input type="radio" name="outputMode" value="verbose" checked={outputMode === 'verbose'} onChange={() => props.setOutputMode('verbose')} />
                Verbose
              </label>
              <label className="radio-label">
                <input type="radio" name="outputMode" value="brief" checked={outputMode === 'brief'} onChange={() => props.setOutputMode('brief')} />
                Brief
              </label>
            </div>
          </div>
    );
  }