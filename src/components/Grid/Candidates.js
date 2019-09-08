import React from "react";
// import Candidate from './Candidate';

class Candidates extends React.Component{
    constructor(props){
        super(props);
        // console.log(props.candidates);
        let candidates = [];
        for(let j = 0; j < 3; j++){
            let row = [];
            for(let i = 1; i < 4; i++){
                let candidate = 3*j + i;
                // console.log(candidate);
                let c = {
                    value: candidate,
                    active: false
                };
                // if(props.candidates.includes(candidate))
                //     c.active = true;
                row.push(c);
            }
            candidates.push(row);
        }
        

        this.state = {candidates};
    }

    componentDidMount(){
        document.addEventListener('keydown', this.toggleClassKeyPress);
        // this.resetCandidates();
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.toggleClassKeyPress);
    }

    componentDidUpdate(prevProps){
        if(this.props.currentActive.row === -1 &&
            this.props.currentActive.column === -1){
                if(prevProps.currentActive.row !== this.props.currentActive.row &&
                    prevProps.currentActive.column !== this.props.currentActive.row)
                    this.resetCandidates();
            }
    }

    toggleClass = (row, column)=>{
        let candidates = [...this.state.candidates];

        let active = !candidates[row][column].active;

        candidates[row][column].active = active;

        this.setState({candidates});
    }

    toggleClassKeyPress = (event)=>{
        if(!this.props.candidateMode)
            return;

        if((this.props.row !== this.props.currentActive.row) || (this.props.column !== this.props.currentActive.column))
            return;
        
        if(this.props.guess === 0 && (event.keyCode === 8 || event.keyCode === 46)){
            let candidates = [...this.state.candidates];
            for(let i = 0; i < candidates.length; i++){
                for(let j = 0; j < candidates[i].length; j++){
                    candidates[i][j].active = false;
                }
            }
            this.setState({candidates});
        }

        if(event.keyCode >= 49 && event.keyCode <= 57){
            let inputNum = parseInt(String.fromCharCode(event.keyCode));
            let candidates = [...this.state.candidates];
            switch (inputNum) {
                case 1 :
                    candidates[0][0].active = !candidates[0][0].active;
                    break;
                case 2 :
                    candidates[0][1].active = !candidates[0][1].active;
                    break;
                case 3 :
                    candidates[0][2].active = !candidates[0][2].active;
                    break;
                case 4 :
                    candidates[1][0].active = !candidates[1][0].active;
                    break;
                case 5 :
                    candidates[1][1].active = !candidates[1][1].active;
                    break;
                case 6 :
                    candidates[1][2].active = !candidates[1][2].active;
                    break;
                case 7 :
                    candidates[2][0].active = !candidates[2][0].active;
                    break;
                case 8 :
                    candidates[2][1].active = !candidates[2][1].active;
                    break;
                case 9 :
                    candidates[2][2].active = !candidates[2][2].active;
                    break;
                default: 
                    break;
            }

            this.setState({candidates});
        }
    }

    resetCandidates = ()=>{
        //alert("hi");
        let candidates = [...this.state.candidates];

        for(let r = 0; r < 3; r++){
            for(let c = 0; c < 3; c++){
                candidates[r][c].active = false;
            }
        }

        this.setState({candidates});
    }

    render(){
        let candidateStyle = {};
        if(!this.props.display || this.props.revealed)
            candidateStyle = {
                display: 'none'
            };
        
        return(
            <div className="candidates" style={candidateStyle}>
                {!this.props.prefilled &&
                    <table>
                        <tbody>
                            {this.state.candidates.map((r,i)=>(
                                <tr key={`${this.props.row}${this.props.column}row${i}`}>
                                    {r.map((c, j)=>(
                                        <td className={this.state.candidates[i][j].active ? 'activeCandidate' : ''} 
                                            key={`${this.props.row}${this.props.column}column${j}`} 
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
