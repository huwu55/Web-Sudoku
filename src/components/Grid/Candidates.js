import React from "react";

class Candidates extends React.Component{
    constructor(props){
        super(props);

        let candidates = [];
        for(let j = 0; j < 3; j++){
            let row = [];
            for(let i = 1; i < 4; i++){
                let candidate = 3*j + i;
                console.log(candidate);
                let c = {
                    value: candidate,
                    active: false
                };
                row.push(c);
            }
            candidates.push(row);
        }
        

        this.state = {candidates};
    }

    toggleClass = (row, column)=>{
        let candidates = [...this.state.candidates];

        let active = !candidates[row][column].active;

        candidates[row][column].active = active;

        this.setState({candidates});
    }

    render(){
        return(
            <div className="candidates">
                {!this.props.prefilled &&
                    <table>
                        <tbody>
                            {this.state.candidates.map((r,i)=>(
                                <tr key={`${this.props.gridPosition}row${i}`}>
                                    {r.map((c, j)=>(
                                        <td className={this.state.candidates[i][j].active ? 'activeCandidate' : ''} 
                                            key={`${this.props.gridPosition}column${j}`} 
                                            onClick={()=>this.toggleClass(i, j)}
                                        >
                                            {c.value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

export default Candidates;