import React,{Component} from 'react'
import DropdownItem from './DrobdownItem/DrobdownItem'

class Dropdown extends Component{

    state = {
        classes: 'dropdown',
        open: false,
        items: [
            {text:1, id:0},
            {text:2, id:1},
            {text:3, id:2}
        ],
        index: 0,
    }

    

    ItemClickHandler = (index,dropboxNumber) => {
        this.setState({
            index: index
        })

    //    let vStart = 1
    //    let vEnd = 5

       const num = this.state.items[index].text
        if(dropboxNumber===1){
           
             console.log('начальная вершина')
            this.props.onCalculationPath(num, null, this.props.graphFile)
        }
 
         if(dropboxNumber===2){
            console.log('конечная вершина')
             //this.pathСalculationHandler(null,num)
             this.props.onCalculationPath(null, num, this.props.graphFile)
         }    
        
         //this.props.onCalculationPath(vStart, vEnd, this.props.graphFile)
     }

    

    dropdownToogleHandler =() => {

        if(this.state.open){
            this.setState({
                classes: 'dropdown',
                open: false,
            })
        }else{
            this.setState({
                classes: 'dropdown open',
                open: true,
            })
        }

     

    }

    //нахождение уникального значения в  массиве
    unique(arr) {
        let result = [];
      
        nextInput:
          for (let i = 0; i < arr.length; i++) {
            let str = arr[i]; // для каждого элемента
            for (let j = 0; j < result.length; j++) { // ищем, был ли он уже?
              if (result[j] === str) continue nextInput; // если да, то следующий
            }
            result.push(str);
          }
        return result;
      }



    componentWillMount(){
       
        const graph = this.props.graphFile.graph

        //получение вершин и запись их в селектор
         const vertex = []
         for(let key in graph){
             vertex.push(graph[key].vertex1)
             vertex.push(graph[key].vertex2)
             
         }
         const vertexses = this.unique(vertex).sort()
         const items = []
         for(let key in vertexses){
             items[key] = {text:vertexses[key],id:key}
         }
         this.setState({
              items: items
         })

         this.props.onCalculationPath(null, null, this.props.graphFile)

 
    }
    

    render(){
        return(
            <div className={'dropdown-box'}>
            <label>{ this.props.labelTitle}</label><br />
            <div onClick={this.dropdownToogleHandler} className={this.state.classes}>
                <div className={'dropdown__label'}>
                   {this.state.items[this.state.index].text}
                </div>
                <ul className={'dropdown__menu'}>
                { this.state.items.map((item,index)=>{
                            return(
                                <DropdownItem
                                    index={this.props.index}
                                    key = {index}
                                    item = {item}
                                    ItemClickHandler={this.ItemClickHandler}
                                />
                            )
                        }) }
                </ul>
            </div>
        </div>

        )
    }
}



export default Dropdown