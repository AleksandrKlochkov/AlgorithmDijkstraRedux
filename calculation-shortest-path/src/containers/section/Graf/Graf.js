import React, {Component} from 'react'
import Dropdown from '../../../components/Dropdown/Dropdown'
import graphFile from './Graf.json'
import {connect} from 'react-redux'

class Graf extends Component{
  
render(){
        return(
                <div className={'graf'}>
                    <div className={'container'}>
                            <div className={'select-box'}>
                                <ul>
                                    <li>
                                        <Dropdown 
                                            graphFile = {graphFile}
                                            index = {1}
                                            labelTitle={'Выберите начальную вершину'}
                                            onCalculationPath = {this.props.onCalculationPath}
                                        />
                                    </li>
                                    <li>
                                        <Dropdown 
                                        graphFile = {graphFile}
                                        index = {2}
                                        labelTitle = {'Выберите конечную вершину'}
                                        onCalculationPath = {this.props.onCalculationPath}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className={'rezults-box'}>
                                <h1>Результаты</h1>
                                <p>{this.props.grapgReduser.result}</p>
                            </div>  
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        grapgReduser: state.grapgReduser
    }
  }
  
  function mapDispatchToProps(dispatch) {
   
    return {
        onCalculationPath: (start,end,graph) => dispatch({type: 'CALCULATION__PATH', start: start, end:end, graph:graph})
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Graf)


