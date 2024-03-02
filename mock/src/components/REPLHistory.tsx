import '../styles/main.css';
import { Printable } from './utility/Printable'

interface REPLHistoryProps{
    history: string[];
    outputMode: string;
    commandOutput: Printable<any>[];
}

export function REPLHistory(props: REPLHistoryProps) {
    return (
        <div className="repl-history">
            <table className="command-table">
                <thead>
                    {props.outputMode === 'verbose' ? (
                        <tr><th>Command</th><th>Output</th></tr>
                    ) : (
                        <tr><th>Output</th></tr>
                    )}
                </thead>
                <tbody>
                    {/* .slice().reverse() so most recent results are displayed at the top */}
                    {props.history.slice().reverse().map((line, index) => (
                        <tr key={index} className="table-row">
                        {props.outputMode === 'verbose' ? (
                            <>
                                <td className="table-cell">{line}</td>
                                <td className="table-cell">{props.commandOutput.slice().reverse()[index].print()}</td>
                            </>
                        ) : (
                            <td className="table-cell">{props.commandOutput.slice().reverse()[index].print()}</td>
                            
                        )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}